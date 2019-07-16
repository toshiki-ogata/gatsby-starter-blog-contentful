import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled, { createGlobalStyle } from 'styled-components'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import blockquoteIcon from '../../static/assets/icon_blockquote.svg'

class PostTemplate extends React.Component {
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
          postSEO
        />
        <H1>{post.title}</H1>
        <PublishDate>{post.createdAt}</PublishDate>
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
    margin-bottom: 13.6px;
  }
`

export const PublishDate = styled.time`
  margin-bottom: 16px;
  line-height: 1;
  font-size: 1.4rem;
  display: block;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    margin-bottom: 20px;
  }
`

export const Thumbnail = styled(Img)`
  display: block;
  max-width: 100%;
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
      margin-top: 26.4px;
      font-size: 2.8rem;
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        font-size: 3.2rem;
        margin-top: 41.6px;
      }
    }
    h2 {
      margin-top: 27.2px;
      font-size: 2.2rem;
      padding-bottom: 5px;
      border-bottom: 1px solid ${props => props.theme.colors.base};
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        font-size: 2.4rem;
        margin-top: 43.2px;
      }
    }
    h3 {
      margin-top: 24px;
      font-size: 1.8rem;
      padding-left: 10px;
      border-left: 4px solid ${props => props.theme.colors.base};
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        font-size: 2rem;
        margin-top: 32px;
      }
    }
    h4 {
      margin-top: 20.4px;
      font-size: 1.8rem;
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        margin-top: 28.4px;
      }
    }
    h5 {
      margin-top: 20.8px;
      font-size: 1.6rem;
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        margin-top: 28.8px;
      }
    }
    h6 {
      margin-top: 21.2px;
      font-size: 1.4rem;
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        font-size: 1.4rem;
        margin-top: 29.2px;
      }
    }
    p {
      margin-top: 17.6px;
      & + p {
        margin-top: 11.2px;
      }
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        margin-top: 25.6px;
        & + p {
          margin-top: 19.2px;
        }
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
      margin-top: 24px;
      max-width: 100%;
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        margin-top: 32px;
      }
    }
    ul,
    ol {
      margin-top: 24px;
      padding-left: 1em;
      ul,
      ol,
      p {
        margin-top: 0;
      }
      p {
        display: inline;
      }
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        margin-top: 32px;
      }
    }
    blockquote {
      background: #f6f6f6;
      padding: 17.6px 32px 17.6px 36px;
      border-left: 4px solid #888;
      color: #666;
      margin-top: 24px;
      position: relative;
      background-image: url(${blockquoteIcon});
      background-position: 13px 12px;
      background-repeat: no-repeat;
      background-size: 16px auto;
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        margin-top: 32px;
      }
      > p:first-child {
        margin-top: 0;
      }
    }
    blockquote > blockquote {
      margin-top: 17.6px;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin-top: 24px;
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
        margin-top: 32px;
      }
    }
    pre {
      font-size: 1.4rem;
      margin: 0;
    }
    .gatsby-highlight {
      margin-top: 24px;
      @media screen and (min-width: ${props => props.theme.responsive.medium}) {
        margin-top: 32px;
      }
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

export default PostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      slug
      title
      description
      createdAt(formatString: "YYYY.M.D")
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
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
