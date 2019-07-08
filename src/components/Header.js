import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
const config = require('../utils/siteConfig')

const Header = () => (
  <header>
    <Wrapper>
      <Inner>
        <H1>
          <H1Link to="/">{config.siteTitle}</H1Link>
        </H1>
      </Inner>
    </Wrapper>
  </header>
)

export const Wrapper = styled.div`
  background: ${props => props.theme.colors.base};
  height: 56px;
  padding-right: 4%;
  padding-left: 4%;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    height: 80px;
    padding-right: 32px;
    padding-left: 32px;
  }
`

export const Inner = styled.div`
  max-width: 1120px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
`

export const H1 = styled.h1`
  margin: 0;
  display: flex;
`

export const H1Link = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 2rem;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    font-size: 2.6rem;
  }
`

export const Logo = styled.img`
  color: #fff;
  margin: 0;
  height: 26px;
  vertical-align: bottom;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    height: 36px;
  }
`

export default Header
