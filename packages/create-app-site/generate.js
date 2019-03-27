const {removeSync, copySync, writeJsonSync} = require('fs-extra')
const {join} = require('path')

module.exports = (appPath, config) => {
  const templatePath = join(__dirname, 'node_modules/app-site-template/')
  const destinationPath = join(appPath, 'generated/')
  const configDestinationPath = join(
    destinationPath,
    'src/app-site-config.json',
  )

  removeSync(destinationPath)
  copySync(templatePath, destinationPath)
  writeJsonSync(configDestinationPath, config)
  writeJsonSync(join(templatePath, 'src/app-site-config.json'), config)
}
