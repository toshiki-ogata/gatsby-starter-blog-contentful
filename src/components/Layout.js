import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Header from './Header'
import Footer from './Footer'
import theme from '../styles/theme'
import GlobalStyle from '../styles/GlobalStyle'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faRss, faAngleRight, faTag } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faRss, faAngleRight, faTag)

const Layout = props => {
  const { children, pageType } = props
  let pageMaxWidth = 0
  if (pageType === 'index') {
    pageMaxWidth = '1184px'
  } else if (pageType === 'post') {
    pageMaxWidth = '784px'
  }
  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalStyle />
        <Header />
        <Wrapper pageMaxWidth={pageMaxWidth}>
          <main>{children}</main>
        </Wrapper>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export const Wrapper = styled.div`
  padding: 30px 4% 0;
  margin: 0 auto;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    padding: 52px 32px 0;
    max-width: ${props => props.pageMaxWidth};
  }
`

export default Layout
