import React from 'react'
import { graphql } from 'gatsby'

import styled, { createGlobalStyle } from 'styled-components'
import Layout from '../components/layout'
import SEO from '../components/seo'
// import Image from "../components/Image"

class BlogPostTemplate extends React.Component {
  render() {
    const { data, location } = this.props
    const post = data.markdownRemark
    const siteTitle = data.site.siteMetadata.title
    // const { previous, next } = pageContext

    return (
      <Layout location={location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <H1>{post.frontmatter.title}</H1>
        <Date>
          {post.frontmatter.date}
          更新
        </Date>
        {/* console.log({`../../content/blog${post.fields.slug + post.frontmatter.tmb}`});
        <Image filename={`../../content/blog${post.fields.slug + post.frontmatter.tmb}`} /> */}
        {/* <img src={this.props.location.pathname + post.frontmatter.tmb} alt=""/> */}
        <GlobalStyle />
        <div className="post" dangerouslySetInnerHTML={{ __html: post.html }} />
        {/* <hr /> */}

        {/* <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul> */}
      </Layout>
    )
  }
}

export const H1 = styled.h1`
  margin: 0 0 22px 0;
  line-height: 1.4;
  font-weight: bold;
  font-size: 2.8rem;
`

export const Date = styled.time`
  margin: 0 0 20px 0;
  line-height: 1.4;
  font-size: 1.4rem;
  display: block;
`

const GlobalStyle = createGlobalStyle`
  .post {
    h2 {
      line-height: 1.4;
      font-weight: bold;
      margin: 32px 0 24px 0;
      font-size: 2.2rem;
      padding-bottom: 5px;
      border-bottom: 1px solid #333;
      @media screen and (min-width: 768px) {

      }
    }
    h3 {
      line-height: 1.4;
      font-weight: bold;
      margin: 32px 0 24px 0;
      font-size: 1.8rem;
      padding-left: 10px;
      border-left: 4px solid #333;
      @media screen and (min-width: 768px) {

      }
    }
    p {
      line-height: 1.7;
      margin: 0 0 24px 0;
      font-size: 1.6rem;
    }
    a {
      transition: all .2s linear;
      color: #005BEA;
      &:hover {
        opacity: .5;
      }
    }
    ul, ol {
      font-size: 1.6rem;
      line-height: 1.7;
      list-style: none;
      margin: 0 0 24px 0;
      li {
        position: relative;
        &:not(:last-child) {
          margin-bottom: 4px;
        }
      }
    }
    ul {
      padding-left: 16px;
      @media screen and (min-width: 768px) {

      }
      li {
        &::before {
          border-radius: 50%;
          content: "";
          display: block;
          height: 6px;
          left: -16px;
          position: absolute;
          top: .7em;
          width: 6px;
          background: #333;
        }
        @media screen and (min-width: 768px) {

        }
      }
    }
    ol {
      counter-reset: my-counter;
      padding-left: 1.1em;
      @media screen and (min-width: 768px) {

      }
      li {
        &::before {
          content: counter(my-counter) ".";
          counter-increment: my-counter;
          font-weight: 700;
          left: -1.1em;
          position: absolute;
        }
      }
    }
  }
`

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY年M月D日")
      }
    }
  }
`
