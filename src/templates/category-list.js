import React from 'react'
import { Link, graphql } from 'gatsby'

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

export const Pager = styled.ul`
  justify-content: center;
  list-style: none;
  margin: 0 0 24px 0;
  display: flex;
`

export const PagerItem = styled.li`
  height: 40px;
  line-height: 38px;
  width: 40px;
  border: 1px solid #000;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  transition: background-color 0.4s;
  &:not(:last-child) {
    margin-right: 10px;
  }
  &:hover {
    background-color: #000;
  }
`

export const ItemLink = styled(Link)`
  display: block;
  height: 100%;
  text-decoration: none;
  width: 100%;
  color: initial;
  &:hover {
    color: #fff;
  }
`

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
