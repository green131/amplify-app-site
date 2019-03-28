const {join} = require('path')
const AWS = require('aws-sdk')
const {readFileSync} = require('fs')
const request = require('request-promise')
const generate = require('./generate')

const postToAppetize = (signedUrl, token, publicKey) =>
  request.post(
    `https://${token}@api.appetize.io/v1/apps${
      publicKey ? `/${publicKey}` : ''
    }`,
    {
      body: {
        url: signedUrl,
        platform: 'android',
      },
      json: true,
    },
  )

module.exports = async ({token, apkPath, ...config}) => {
  try {
    const {filename: parent} = module.parent
    const projectPath = join(parent, '..')
    const absoluteApkPath = join(projectPath, apkPath)
    const Bucket = 'hackathon-amplify-app-bucket'
    const Key = 'APK.apk'

    console.log('uploading apk')

    const s3 = new AWS.S3({
      region: 'us-west-2',
    })

    const apk = readFileSync(absoluteApkPath)

    const signedUrl = await new Promise(resolve => {
      s3.upload(
        {
          Bucket,
          Key,
          Body: apk,
        },
        () => {
          resolve(
            s3.getSignedUrl('getObject', {
              Bucket,
              Key,
              Expires: 300,
            }),
          )
        },
      )
    })

    console.log('checking if project exists on Appetize')

    const existsResponse = await request.get(
      `https://${token}@api.appetize.io/v1/apps`,
    )
    const existsParsed = JSON.parse(existsResponse)
    const {data: existsData} = existsParsed

    if (existsData.length) {
      console.log('updating project on Appetize')

      const [first] = existsData
      const {publicKey} = first
      const appetizeResponse = await postToAppetize(signedUrl, token, publicKey)
      console.log(appetizeResponse)
      generate(projectPath, {...config, publicKey})
    } else {
      console.log('creating project on Appetize')
      const appetizeResponse = await postToAppetize(signedUrl, token)
      const {publicKey} = appetizeResponse
      generate(projectPath, {...config, publicKey})
    }
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}
