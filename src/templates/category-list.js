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
  }

  moreClick = () => {
    this.Article.current.showItem()
  }

  render() {
    const { data, location, pageContext } = this.props
    const { title, totalPosts } = data.site.siteMetadata
    const { categorySlug, categoryName } = pageContext
    const posts = data.allMarkdownRemark.edges
    const filterPosts = posts.filter(
      post => post.node.frontmatter.categorySlug === categorySlug
    )

    return (
      <Layout location={location} title={title}>
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
        <MoreButton moreClick={this.moreClick} />
      </Layout>
    )
  }
}

export const Section = styled.section`
  margin-bottom: 29.5px;
  @media screen and (min-width: 768px) {
    margin-bottom: 52px;
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY.M.D ")
            title
            categorySlug
            tmb {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
