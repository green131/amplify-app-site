const {removeSync, copySync, writeJsonSync} = require('fs-extra')
const {join} = require('path')
const {realpathSync} = require('fs')

module.exports = (appPath, config) => {
  const templatePath = join(
    __dirname,
    'node_modules/@aws-hackathon-2019-app-site-generator/app-site-template',
  )
  const actualTemplatePath = realpathSync(templatePath) // symlinked in dev

  const configDestinationPath = join(
    actualTemplatePath,
    'src/app-site-config.json',
  )

  console.log('generating website')
  writeJsonSync(configDestinationPath, config)
  removeSync(join(templatePath, 'src/assets/apk.js'))
  copySync(
    join(appPath, 'source/app/build/outputs/apk/debug/app-debug.apk'),
    join(templatePath, 'src/assets/app-debug.apk'),
  )
}
