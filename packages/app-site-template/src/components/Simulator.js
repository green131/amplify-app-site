import React from 'react'
import styled from 'styled-components'
import {
  appName as APP_NAME,
  publicKey,
  device,
  autoplay,
  language,
} from '../app-site-config.json'

const Placeholder = styled.div`
  width: 312px;
  height: 652.5px;
  background-color: #000;
  border-radius: 40px;
  margin: 0px;
`

const EMBED_URL = `https://appetize.io/embed/${publicKey}?device=${
  device.model
}&scale=${device.scale}&autoplay=${!!autoplay}&orientation=${
  device.orientation
}&deviceColor=${device.color}&language=${language || 'en'}&centered=${
  device.centered
}&grantPermissions=true`

export default ({devMode}) =>
  devMode ? (
    <Placeholder />
  ) : (
    <iframe
      title={`Demo of ${APP_NAME}`}
      src={EMBED_URL}
      width="378px"
      height="800px"
      frameBorder="0"
      scrolling="no"
    />
  )
