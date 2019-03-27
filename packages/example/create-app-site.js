require('create-app-site')({
  token: process.argv.pop(),
  apkPath: 'app-debug.apk',
  appName: 'my app',
  tagline: 'does something really awesome',
  device: {
    model: 'iphone8',
    scale: '75',
    orientation: 'portrait',
    color: 'black',
  },
  autoplay: true,
  language: 'en',
})
