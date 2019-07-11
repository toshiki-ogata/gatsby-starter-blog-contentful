import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Heading from '../components/Heading'
import Article from '../components/Article'
import MoreButton from '../components/MoreButton'
import Section from '../components/Section'
import config from '../utils/siteConfig'

class TagTemplate extends React.Component {
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
    const linkState = this.Article.current.state.linkDisplay
    const linkStateResult = linkState.every(item => item === 'block')
    if (linkStateResult) {
      this.MoreButton.current.hiddenItem()
    }
  }

  render() {
    const { data, pageContext } = this.props
    const { tag } = pageContext
    const posts = data.allContentfulPost.edges
    const filterPosts = posts.filter(post => post.node.tag.includes(tag))

    return (
      <Layout pageType="index">
        <SEO title="All posts" pagePath={`tag/${tag}`} />
        <Section>
          <Heading main={`${tag}`} />
          <Article posts={filterPosts} ref={this.Article} />
        </Section>
        {filterPosts.length > config.postsPerPage && (
          <MoreButton moreClick={this.moreClick} ref={this.MoreButton} />
        )}
      </Layout>
    )
  }
}

export default TagTemplate

export const pageQuery = graphql`
  query {
    allContentfulPost(sort: { fields: createdAt, order: DESC }) {
      edges {
        node {
          slug
          title
          tag
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
