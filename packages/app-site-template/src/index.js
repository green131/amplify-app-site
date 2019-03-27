import React from 'react'
import styled from 'styled-components'
import {GlobalStyle, Header, Simulator} from './components'
import {render} from 'react-dom'
import * as serviceWorker from './utils/serviceWorker'

const Container = styled.div`
  width: 100%;
  padding: 0px 5%;

  > div {
    width: 100%;
    max-width: 1000px;
    margin: 0px auto;
  }
`

const App = () => {
  return (
    <>
      <GlobalStyle />
      <div>
        <Header />
        <Container>
          <div>
            <Simulator devMode />
          </div>
        </Container>
      </div>
    </>
  )
}

render(<App />, document.getElementById('root'))
serviceWorker.unregister()
