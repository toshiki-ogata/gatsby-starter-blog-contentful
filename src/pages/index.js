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
  }

  moreClick = () => {
    this.Article.current.showItem()
  }

  render() {
    const { data, location } = this.props
    const { title, totalPosts } = data.site.siteMetadata
    const posts = data.allMarkdownRemark.edges
    const pickUpPosts = ['/test1/', '/test2/', '/test3/']
    const pickUpFilterPosts = posts.filter(post =>
      pickUpPosts.includes(post.node.fields.slug)
    )

    return (
      <Layout location={location} title={title}>
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

export default BlogIndex

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
            date(formatString: "YYYY.M.D")
            title
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
