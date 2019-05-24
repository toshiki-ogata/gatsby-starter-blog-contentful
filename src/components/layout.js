import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import styles from '../styles'
import GlobalStyle from '../styles/GlobalStyle'
import styled, { ThemeProvider } from 'styled-components'

class Layout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <ThemeProvider theme={styles}>
        <div>
          <GlobalStyle />
          <Header />
          <Wrapper>
            <main>{children}</main>
          </Wrapper>
          <Footer />
        </div>
      </ThemeProvider>
    )
  }
}

export const Wrapper = styled.div`
  padding: 30px 4% 56px;
  margin: 0 auto;
  @media screen and (min-width: 768px) {
    padding: 52px 32px 80px;
    max-width: 1184px;
  }
`;

export default Layout
