import React from 'react'
import styled from 'styled-components'
import {appName, tagline} from '../app-site-config.json'

const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid #e9e9e9;
  text-align: center;

  > h1 {
    font-size: 32px;
    font-weight: 400;
  }
`

export default () => (
  <Container>
    <h1>{appName}</h1>
    <h3>{tagline}</h3>
  </Container>
)
