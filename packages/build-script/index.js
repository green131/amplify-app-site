const fetch = require('node-fetch')

// get the URL to the .apk

;(async () => {
  const apkUrl = null // for now

  // const response = await fetch(
  //   'https://tok_5xuvbrrakmp5m3p64b5hrecmrm@api.appetize.io/v1/apps',
  //   {
  //     method: 'post',
  //     body: JSON.stringify({
  //       file: apkUrl,
  //       platform: 'android',
  //     }),
  //     headers: {'Content-Type': 'application/json'},
  //   },
  // )

  const response = await fetch(
    'https://tok_5xuvbrrakmp5m3p64b5hrecmrm@api.appetize.io/v1/apps/ag_9huhxqj4eq4jhyxu5228rp17c4',
    {
      method: 'post',
      body: JSON.stringify({
        file: apkUrl,
        platform: 'android',
      }),
    },
  )
})()
