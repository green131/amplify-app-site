const {removeSync, copySync, writeJsonSync} = require('fs-extra')
const {join} = require('path')
const {realpathSync} = require('fs')

module.exports = (appPath, config) => {
  const templatePath = join(__dirname, 'node_modules/app-site-template')
  const actualTemplatePath = realpathSync(templatePath) // symlinked in dev

  const destinationPath = join(appPath, 'generated/')
  const configDestinationPath = join(
    destinationPath,
    'src/app-site-config.json',
  )

  console.log('generating website')
  removeSync(destinationPath)
  copySync(actualTemplatePath, destinationPath)
  writeJsonSync(configDestinationPath, config)
  writeJsonSync(join(actualTemplatePath, 'src/app-site-config.json'), config) // keeps configs in sync in dev
}
