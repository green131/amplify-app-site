import React from 'react'
import styled from 'styled-components'
import {appName, tagline} from '../app-site-config.json'

const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid #e9e9e9;
  text-align: center;
  padding: 25px 0px 20px 0px;

  > h1 {
    font-size: 32px;
    font-weight: 400;
    text-transform: uppercase;
    margin: 0px 0px 10px 0px;
  }

  > h3 {
    margin: 0px;
  }
`

export default () => (
  <Container>
    <h1>{appName}</h1>
    <h3>{tagline}</h3>
  </Container>
)
