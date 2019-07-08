import React from 'react'
// import { StaticQuery, graphql } from "gatsby"
import styled from 'styled-components'

class Heading extends React.Component {
  render() {
    const { main, sub } = this.props
    return (
      <H2>
        <Main>{main}</Main>
        {(() => {
          if (sub !== null) {
            return <Sub>{sub}</Sub>
          }
        })()}
      </H2>
    )
  }
}

export const H2 = styled.h2`
  color: ${props => props.theme.colors.base};
  text-align: center;
  margin: 0 0 22px 0;
  line-height: ${props => props.theme.lineHeight.small};
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    margin-bottom: 38px;
  }
`

export const Main = styled.div`
  font-weight: bold;
  font-size: 2.8rem;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    font-size: 3.2rem;
  }
`

export const Sub = styled.div`
  font-size: 1.4rem;
  font-weight: normal;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    padding-right: 32px;
    padding-left: 32px;
  }
`

export default Heading
