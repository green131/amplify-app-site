import React from 'react'
import styled from 'styled-components'
import {GlobalStyle, Header, Simulator} from './components'
import {hydrate, render} from 'react-dom'
import * as serviceWorker from './utils/serviceWorker'

const Container = styled.div`
  width: 100%;
  padding: 0px 5%;

  > div {
    width: 100%;
    max-width: 1000px;
    margin: 0px auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
  }
`

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Container>
        <div>
          <Simulator />
        </div>
      </Container>
    </>
  )
}

const rootElement = document.getElementById('root')
const renderer = rootElement.hasChildNodes() ? hydrate : render
renderer(<App />, rootElement)

serviceWorker.unregister()
