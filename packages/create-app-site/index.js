const {join} = require('path')
const AWS = require('aws-sdk')
const creds = require('./credentials')
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
  const {filename: parent} = module.parent
  const projectPath = join(parent, '..')
  const absoluteApkPath = join(projectPath, apkPath)

  const credentials = new AWS.Credentials(...creds)

  const Bucket = 'hackathon-android-apk-hsolova'
  const Key = 'APK'

  const s3 = new AWS.S3({region: 'us-west-2', credentials})
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

  const existsResponse = await request.get(
    `https://${token}@api.appetize.io/v1/apps`,
  )
  const existsParsed = JSON.parse(existsResponse)
  const {data: existsData} = existsParsed

  if (existsData.length) {
    console.log('updating app')
    const [first] = existsData
    const {publicKey} = first
    await postToAppetize(signedUrl, token, publicKey)
    generate(projectPath, {...config, publicKey})
  } else {
    console.log('creating app')
    const {publicKey} = await postToAppetize(signedUrl, token)
    generate(projectPath, {...config, publicKey})
  }
}
