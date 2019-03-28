require('@aws-hackathon-2019-app-site-generator/create-app-site')({
  token: process.env.APPETIZE_TOKEN || process.argv.pop(),
  apkPath: 'app-debug.apk',
  appName: 'my app',
  tagline: 'does something really awesome',
  device: {
    model: 'nexus5',
    scale: '75',
    orientation: 'portrait',
    color: 'black',
    centered: true,
  },
  autoplay: true,
  language: 'en',
})
