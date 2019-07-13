import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Heading from '../components/Heading'
import Article from '../components/Article'
import MoreButton from '../components/MoreButton'
import Section from '../components/Section'
import config from '../utils/siteConfig'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.Article = React.createRef()
    this.MoreButton = React.createRef()
  }

  moreClick = () => {
    const promise = Promise.resolve()
    promise.then(this.Article.current.showItem()).then(this.articleDisplayCheck)
  }

  articleDisplayCheck = () => {
    const linkState = this.Article.current.state.display
    const linkStateResult = linkState.every(item => item === 'block')
    if (linkStateResult) {
      this.MoreButton.current.hiddenItem()
    }
  }

  render() {
    const { data } = this.props
    const posts = data.allContentfulPost.edges
    const pickUpFilterPosts = posts.filter(post =>
      config.pickUpPosts.includes(post.node.slug)
    )

    return (
      <Layout pageType="index">
        <SEO />
        <Section>
          <Heading main="PICK UP" sub="注目の記事" />
          <Article posts={pickUpFilterPosts} ref={this.Article} />
        </Section>
        <Section>
          <Heading main="NEW POSTS" sub="新着記事" />
          <Article posts={posts} ref={this.Article} />
        </Section>
        {posts.length > config.postsPerPage && (
          <MoreButton moreClick={this.moreClick} ref={this.MoreButton} />
        )}
      </Layout>
    )
  }
}

export default Index

export const pageQuery = graphql`
  query {
    allContentfulPost(sort: { fields: createdAt, order: DESC }) {
      edges {
        node {
          slug
          title
          createdAt(formatString: "YYYY.M.D")
          thumbnail {
            fluid(maxWidth: 720) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
