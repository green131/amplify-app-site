const {join} = require('path')
const AWS = require('aws-sdk')
const {readFileSync} = require('fs')
const request = require('request-promise')

module.exports = async args => {
  const {token, apkPath} = args

  const {filename: parent} = module.parent
  const projectPath = join(parent, '..')
  const absoluteApkPath = join(projectPath, apkPath)

  const credentials = new AWS.Credentials(
    'AKIAISQ6K64RI7UUPKXQ',
    'tlbrmFMbWyN+xOXE0/ffYEwqwfgdINlC2xy2bxHb',
  )

  const s3 = new AWS.S3({region: 'us-west-2', credentials})
  const apk = readFileSync(absoluteApkPath)

  const signedUrl = await new Promise(resolve => {
    s3.upload(
      {
        Bucket: 'hackathon-android-apk-hsolova',
        Key: 'APK',
        Body: apk,
      },
      () => {
        resolve(
          s3.getSignedUrl('getObject', {
            Bucket: 'hackathon-android-apk-hsolova',
            Key: 'APK',
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
    const updatedResponse = await request.post(
      `https://${token}@api.appetize.io/v1/apps/${publicKey}`,
      {
        body: {
          url: signedUrl,
          platform: 'android',
        },
        json: true,
      },
    )

    console.log(updatedResponse)
  } else {
    console.log('creating app')

    const createdResponse = await request.post(
      `https://${token}@api.appetize.io/v1/apps`,
      {
        body: {
          url: signedUrl,
          platform: 'android',
        },
        json: true,
      },
    )

    console.log(createdResponse)
  }
}
