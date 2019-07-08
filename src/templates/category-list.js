import React from 'react'
import { graphql } from 'gatsby'

import styled from 'styled-components'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Heading from '../components/Heading'
import Article from '../components/Article'
import MoreButton from '../components/MoreButton'

class PostListTemplate extends React.Component {
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
    const { data, location, pageContext } = this.props
    const { title, totalPosts } = data.site.siteMetadata
    const { categorySlug, categoryName } = pageContext
    const posts = data.allContentfulPost.edges
    const filterPosts = posts.filter(
      post => post.node.categorySlug === categorySlug
    )

    return (
      <Layout location={location} title={title} pageType="index">
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Section>
          <Heading main={`${categoryName}`} />
          <Article
            posts={filterPosts}
            ref={this.Article}
            totalPosts={totalPosts}
          />
        </Section>
        {(() => {
          if (filterPosts.length > totalPosts) {
            return (
              <MoreButton moreClick={this.moreClick} ref={this.MoreButton} />
            )
          }
        })()}
      </Layout>
    )
  }
}

export const Section = styled.section`
  margin-bottom: 56px;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    margin-bottom: 80px;
  }
`

export default PostListTemplate

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        totalPosts
      }
    }
    allContentfulPost(sort: { fields: publishDate, order: DESC }) {
      edges {
        node {
          categoryName
          categorySlug
          title
          slug
          publishDate(formatString: "YYYY.M.D")
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
