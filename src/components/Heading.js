import React from 'react'
// import { StaticQuery, graphql } from "gatsby"
import styled from 'styled-components'

class Heading extends React.Component {
  render() {
    const { main, sub } = this.props
    return (
      <H2>
        <Main>{main}</Main>
        <Sub>{sub}</Sub>
      </H2>
    )
  }
}

export const H2 = styled.h2`
  color: #333;
  text-align: center;
  margin: 0 0 22px 0;
  line-height: 1.4;
  @media screen and (min-width: 768px) {
    margin-bottom: 38px;
  }
`

export const Main = styled.div`
  font-weight: bold;
  font-size: 2.8rem;
  @media screen and (min-width: 768px) {
    font-size: 3.2rem;
  }
`

export const Sub = styled.div`
  font-size: 1.4rem;
  font-weight: normal;
  @media screen and (min-width: 768px) {
    padding-right: 32px;
    padding-left: 32px;
  }
`

export default Heading
