import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Header from './Header'
import Footer from './Footer'
import styles from '../styles'
import GlobalStyle from '../styles/GlobalStyle'

class Layout extends React.Component {
  render() {
    const { children, pageType } = this.props
    let pageMaxWidth = 0
    if (pageType === 'index') {
      pageMaxWidth = '1184px'
    } else if (pageType === 'post') {
      pageMaxWidth = '784px'
    }
    return (
      <ThemeProvider theme={styles}>
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
}

export const Wrapper = styled.div`
  padding: 30px 4% 0;
  margin: 0 auto;
  @media screen and (min-width: 768px) {
    padding: 52px 32px 0;
    max-width: ${props => props.pageMaxWidth};
  }
`

export default Layout
