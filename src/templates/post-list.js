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
    const { id, previous, next } = this.props.pageContext

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
              if (index < 3) {
                return (
                  <Article key={node.fields.slug} link={node.fields.slug} title={node.frontmatter.title} date={node.frontmatter.date} tmb={node.frontmatter.tmb.childImageSharp.fluid} />
                )
              }
            })}
          </ArticleWrapper>
        </Section>
        {(() => {
          if(previous !== null || next !== null) {
            return (
              <Pager>
                {previous && (
                  <PagerItem>
                    <ItemLink to={`/pages/${previous}`} rel="prev">前へ</ItemLink>
                  </PagerItem>
                )}
                {next && (
                  <PagerItem>
                    <ItemLink to={`/pages/${next}`} rel="prev">次へ</ItemLink>
                  </PagerItem>
                )}
              </Pager>
            )
          }
        })()}
      </Layout>
    )
  }
}

export const Pager = styled.ul`
  justify-content: center;
  list-style: none;
  margin: 0 0 24px 0;
  display: flex;
`;

export const PagerItem = styled.li`
  height: 40px;
  line-height: 38px;
  width: 40px;
  border: 1px solid #000;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  transition: background-color .4s;
  &:not(:last-child) {
    margin-right: 10px;
  }
  &:hover {
    background-color: #000;
  }
`;

export const ItemLink = styled(Link)`
  display: block;
  height: 100%;
  text-decoration: none;
  width: 100%;
  color: initial;
  &:hover {
    color: #fff;
  }
`;

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
