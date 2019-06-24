import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Heading from "../components/Heading"
import Article from "../components/Article"
import styled from 'styled-components';

class BlogIndex extends React.Component {
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
        {/* <Section>
          <Heading main="PICK UP" sub="注目の記事" />
          <ArticleWrapper>
            {posts.map(({ node }) => {
              if (node.fields.slug === "/test1/" || node.fields.slug === "/test2/" || node.fields.slug === "/test3/") {
                return (
                  <Article key={node.fields.slug} link={node.fields.slug} title={node.frontmatter.title} date={node.frontmatter.date} tmb={node.frontmatter.tmb} />
                )
              }
            })}
          </ArticleWrapper>
        </Section> */}
        <Section>
          <Heading main="NEW POSTS" sub="新着記事" />
          <ArticleWrapper>
            {posts.map(({ node }, index) => {
              if (index < 3) {
                return (
                  <Article key={node.fields.slug} link={node.fields.slug} title={node.frontmatter.title} date={node.frontmatter.date} tmb={node.frontmatter.tmb.childImageSharp.fluid} />
                )
              }
            })}
          </ArticleWrapper>
        </Section>
        {(() => {
          if(posts.length > 3) {
            return (
              <MoreLinkWrapper>
                <MoreLink to="/pages/1/">Read More</MoreLink>
              </MoreLinkWrapper>
            )
          }
        })()}
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


export const MoreLinkWrapper = styled.div`
  text-align: center;
  margin-top: 56px;
  @media screen and (min-width: 768px) {
    margin-top: 80px;
  }
`;

export const MoreLink = styled(Link)`
  margin-bottom: 29.5px;
  min-width: 200px;
  line-height: 1.4;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  background: linear-gradient(90deg, #00A5FB, #0091F3 50%, #005BEA);
  color: #fff;
  text-decoration: none;
  display: inline-block;
  padding: 14px 20px;
  border-radius: 6px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, .08);
  @media screen and (min-width: 768px) {
    margin-bottom: 52px;
  }
`;

export default BlogIndex

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
