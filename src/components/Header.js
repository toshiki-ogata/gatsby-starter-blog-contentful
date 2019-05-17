import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import styled from 'styled-components';
import logo from '../../content/assets/logo.svg'

function Header() {
  return (
    <StaticQuery
      query={headerQuery}
      render={data => {
        const { title } = data.site.siteMetadata
        return (
          <header>
            <Wrapper>
              <Inner>
                <H1>
                  <Logo src={logo} alt={title} />
                </H1>
                <nav>
                  <Nav>
                    <NavItem><StyledLink to="/">アーカイブ</StyledLink></NavItem>
                    <NavItem><StyledLink to="/">カテゴリ</StyledLink></NavItem>
                    <NavItem><StyledLink to="/">タグ</StyledLink></NavItem>
                  </Nav>
                  <Menu>
                    <MenuItem></MenuItem>
                    <MenuItem></MenuItem>
                    <MenuItem></MenuItem>
                  </Menu>
                </nav>
              </Inner>
            </Wrapper>
          </header>
        )
      }}
    />
  )
}

export const Wrapper = styled.div`
  background: linear-gradient(90deg, #00A5FB, #0091F3 50%, #005BEA);
  height: 56px;
  padding-right: 4%;
  padding-left: 4%;
  @media screen and (min-width: 768px) {
    height: 80px;
    padding-right: 32px;
    padding-left: 32px;
  }
`;

export const Inner = styled.div`
  max-width: 1120px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
`;

export const H1 = styled.h1`
  margin: 0;
`;

export const Logo = styled.img`
  color: #fff;
  margin: 0;
`;

export const Nav = styled.ul`
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
    font-size: 1.4rem;
    margin: 0;
  }
`;

export const NavItem = styled.li`
  @media screen and (min-width: 768px) {
    display: flex;
    margin: 0;
    &:not(:last-child) {
      margin-right: 32px;
    }
  }
`;

export const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  box-shadow: none;
`

export const Menu = styled.div`
  display: inline-block;
  transition: all .4s;
  position: relative;
  width: 19px;
  height: 16px;
  @media screen and (min-width: 768px) {
    display: none;
  }
`

export const MenuItem = styled.span`
  display: inline-block;
  transition: all .4s;
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #fff;
  border-radius: 4px;
  &:nth-of-type(1) {
    top: 0;
  }
  &:nth-of-type(2) {
    top: 7px;
  }
  &:nth-of-type(3) {
    bottom: 0;
  }
`

const headerQuery = graphql`
  query HeaderQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default Header
