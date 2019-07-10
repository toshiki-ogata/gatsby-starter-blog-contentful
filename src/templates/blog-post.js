import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import styled, { createGlobalStyle } from 'styled-components'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import blockquoteIcon from '../../content/assets/icon_blockquote.svg'

class BlogPostTemplate extends React.Component {
  render() {
    const { data } = this.props
    const post = data.contentfulPost
    // const { previous, next } = pageContext

    return (
      <Layout pageType="post">
        <GlobalStyle />
        <SEO
          title={post.title}
          description={post.description}
          postNode={post}
          pagePath={post.slug}
        />
        <H1>{post.title}</H1>
        <PublishDate>
          {post.publishDate}
          更新
        </PublishDate>
        <Thumbnail fluid={post.thumbnail.fluid} />
        <div
          className="post"
          dangerouslySetInnerHTML={{
            __html: post.content.childMarkdownRemark.html,
          }}
        />

        {/* <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul> */}
      </Layout>
    )
  }
}

export const H1 = styled.h1`
  margin: 0 0 10.4px 0;
  line-height: ${props => props.theme.lineHeight.small};
  font-weight: ${props => props.theme.fontWeight.large};
  font-size: 2.8rem;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    font-size: 3.2rem;
    margin-bottom: 9.6px;
  }
`

export const PublishDate = styled.time`
  margin-bottom: 16px;
  line-height: 1;
  font-size: 1.4rem;
  display: block;
`

export const Thumbnail = styled(Img)`
  display: block;
  margin-bottom: 24px;
  max-width: 100%;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    margin-bottom: 32px;
  }
`

const GlobalStyle = createGlobalStyle`
  .post {
    margin-bottom: 56px;
    @media screen and (min-width: ${props => props.theme.responsive.medium}) {
      margin-bottom: 80px;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: ${props => props.theme.lineHeight.small};
    }
    h1 {
      margin: 26.4px 0 18.4px 0;
      font-size: 2.8rem;
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        font-size: 3.2rem;
        margin: 41.6px 0 25.6px 0;
      }
    }
    h2 {
      margin: 27.2px 0 24px 0;
      font-size: 2.2rem;
      padding-bottom: 5px;
      border-bottom: 1px solid ${props => props.theme.colors.base};
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        font-size: 2.4rem;
        margin: 43.2px 0 32px 0;
      }
    }
    h3 {
      margin: 24px 0 24px 0;
      font-size: 1.8rem;
      padding-left: 10px;
      border-left: 4px solid ${props => props.theme.colors.base};
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        font-size: 2rem;
        margin: 32px 0 32px 0;
      }
    }
    h4 {
      margin: 20.4px 0 20.4px 0;
      font-size: 1.8rem;
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        margin: 28.4px 0 28.4px 0;
      }
    }
    h5 {
      margin: 20.8px 0 20.8px 0;
      font-size: 1.6rem;
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        margin: 28.8px 0 28.8px 0;
      }
    }
    h6 {
      margin: 21.2px 0 21.2px 0;
      font-size: 1.4rem;
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        font-size: 1.4rem;
        margin: 29.2px 0 29.2px 0;
      }
    }
    p {
      margin: 0 0 17.6px 0;
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        margin-bottom: 25.6px;
      }
    }
    a {
      transition: all 0.2s linear;
      color: #005bea;
      &:hover {
        opacity: 0.5;
      }
    }
    img {
      display: block;
      margin-bottom: 24px;
      max-width: 100%;
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        margin-bottom: 32px;
      }
    }
    ul,
    ol {
      margin-bottom: 24px;
      padding-left: 1em;
      ul,
      ol,
      p {
        margin-bottom: 0;
      }
      p {
        display: inline;
      }
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        margin-bottom: 32px;
      }
    }
    blockquote {
      background: #f6f6f6;
      padding: 17.6px 32px 17.6px 36px;
      border-left: 4px solid #888;
      color: #666;
      margin-bottom: 24px;
      position: relative;
      background-image: url(${blockquoteIcon});
      background-position: 13px 12px;
      background-repeat: no-repeat;
      background-size: 16px auto;
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        margin-bottom: 32px;
      }
      > p:first-child {
        margin-bottom: 0;
      }
    }
    blockquote > blockquote {
      margin-top: 17.6px;
      margin-bottom: 6.4px;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin-bottom: 24px;
      thead th {
        border-bottom: 2px solid #dee2e6;
        background-color: #e9ecef;
        border-color: #dee2e6;
      }
      td,
      th {
        padding: 0.75em;
        border-top: 1px solid #dee2e6;
      }
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        margin-bottom: 32px;
      }
    }
    pre {
      font-size: 1.4rem;
    }
    hr {
      height: 1px;
      border-color: #dee2e6;
      border-style: solid none none;
      border-width: 1px 0 0;
      margin: 24px 0;
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        margin: 32px 0;
      }
    }
  }
`

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      slug
      id
      content {
        childMarkdownRemark {
          html
        }
      }
      title
      description
      thumbnail {
        fluid(maxWidth: 720) {
          ...GatsbyContentfulFluid
        }
        file {
          url
          details {
            image {
              height
              width
            }
          }
        }
      }
      publishDate(formatString: "YYYY.M.D")
    }
  }
`
