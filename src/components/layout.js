import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import styles from '../styles'
import GlobalStyle from '../styles/GlobalStyle'
import { ThemeProvider } from 'styled-components'

class Layout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <ThemeProvider theme={styles}>
        <div>
          <GlobalStyle />
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </ThemeProvider>
    )
  }
}

export default Layout
