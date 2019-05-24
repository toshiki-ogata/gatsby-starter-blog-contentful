import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Heading from "../components/Heading"
import Article from "../components/Article"
import styled from 'styled-components';

class PostListTemplate extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Section>
          <Heading main="NEW POSTS" sub="新着記事" />
          <ArticleWrapper>
            {posts.map(({ node }, index) => {
              if (index < 12) {
                return (
                  <Article link={node.fields.slug} title={node.frontmatter.title} date={node.frontmatter.date} />
                )
              }
            })}
          </ArticleWrapper>
        </Section>
      </Layout>
    )
  }
}

export const Section = styled.section`
  margin-bottom: 29.5px;
  @media screen and (min-width: 768px) {
    margin-bottom: 52px;
  }
`;

export const ArticleWrapper = styled.div`
  display: grid;
  grid-row-gap: 32px;
  grid-template-columns: repeat(auto-fill, minmax(auto , 450px));
  justify-content: center;
  @media screen and (min-width: 768px) {
    grid-column-gap: 32px;
    grid-row-gap: 40px;
    grid-template-columns: repeat(auto-fill, 352px);
  }
`;

export default PostListTemplate

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
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
            description
          }
        }
      }
    }
  }
`
