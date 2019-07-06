import React from 'react'
import { graphql } from 'gatsby'

import styled from 'styled-components'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Heading from '../components/Heading'
import Article from '../components/Article'
import MoreButton from '../components/MoreButton'

class BlogIndex extends React.Component {
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
    const { data, location } = this.props
    const { title, totalPosts } = data.site.siteMetadata
    const posts = data.allContentfulPost.edges
    const pickUpPosts = ['test1', 'test2', 'test3']
    const pickUpFilterPosts = posts.filter(post =>
      pickUpPosts.includes(post.node.slug)
    )

    return (
      <Layout location={location} title={title} pageType="index">
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Section>
          <Heading main="PICK UP" sub="注目の記事" />
          <Article
            posts={pickUpFilterPosts}
            ref={this.Article}
            totalPosts={totalPosts}
          />
        </Section>
        <Section>
          <Heading main="NEW POSTS" sub="新着記事" />
          <Article posts={posts} ref={this.Article} totalPosts={totalPosts} />
        </Section>
        {(() => {
          if (posts.length > totalPosts) {
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
  @media screen and (min-width: 768px) {
    margin-bottom: 80px;
  }
`

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        totalPosts
      }
    }
    allContentfulPost(sort: { fields: date, order: DESC }) {
      edges {
        node {
          categoryName
          categorySlug
          title
          slug
          date(formatString: "YYYY.M.D")
          tmb {
            fluid(maxWidth: 720) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
