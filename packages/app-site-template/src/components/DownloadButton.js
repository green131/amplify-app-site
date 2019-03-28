import React from 'react'
import styled from 'styled-components'
import apk from '../assets/apk.apk'

const StyledButton = styled.a`
  border: 4px solid #1a488e;
  width: 200px;
  height: 60px;
  background-color: #0e68c9;
  text-transform: uppercase;
  color: #fff;
  margin: 20px auto;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  opacity: 0.875;

  &:hover {
    opacity: 1;
  }
`

export default () => <StyledButton children="download" href={apk} download />
