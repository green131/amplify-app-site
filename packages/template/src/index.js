import React from 'react'
import {
  appName,
  privateKey,
  device,
  autoplay,
  language,
} from './site-config.json'
import {GlobalStyle, DevicePlaceholder} from './components'
import {render} from 'react-dom'
import * as serviceWorker from './utils/serviceWorker'

const App = () => {
  const embedUrl = `https://appetize.io/embed/${privateKey}?device=${
    device.model
  }&scale=${device.scale}&autoplay=${!!autoplay}&orientation=${
    device.orientation
  }&deviceColor=${device.color}&language=${language || 'en'}`

  return (
    <>
      <GlobalStyle />
      <div>
        {/* <iframe
        title={`Demo of ${appName}`}
        src={embedUrl}
        width="378px"
        height="800px"
        frameborder="0"
        scrolling="no"
      /> */}
        <DevicePlaceholder />
      </div>
    </>
  )
}

render(<App />, document.getElementById('root'))
serviceWorker.unregister()
