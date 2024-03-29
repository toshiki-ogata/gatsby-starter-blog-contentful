import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/SEO'

class NotFound extends React.Component {
  render() {
    return (
      <Layout pageType="index">
        <SEO title="404: Not Found" pagePath="404" />
        <h1>Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Layout>
    )
  }
}

export default NotFound
