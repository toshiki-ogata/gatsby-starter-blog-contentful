import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import linkIcon from '../../content/assets/link_icon.svg'

function Footer() {
  return (
    <StaticQuery
      query={footerQuery}
      render={data => {
        const { author } = data.site.siteMetadata
        const posts = data.allMarkdownRemark.edges
        const deduplicatePosts = posts.filter(function(v1, i1, a1) {
          return (
            a1.findIndex(function(v2) {
              return (
                v1.node.frontmatter.categorySlug ===
                v2.node.frontmatter.categorySlug
              )
            }) === i1
          )
        })
        deduplicatePosts.sort((a, b) => {
          const nameA = a.node.frontmatter.categorySlug
          const nameB = b.node.frontmatter.categorySlug
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
          return 0
        })
        return (
          <footer>
            <Wrapper>
              <Inner>
                <Top>
                  <Col>
                    <Heading>About</Heading>
                    <Text>
                      テキストテキスト。テキストテキスト。テキストテキスト。テキストテキスト。テキストテキス。テキストテキスト。テキストテキスト。テキストテキスト。テキストテキスト。テキストテキスト。テキストテキスト。テキストテキスト。
                    </Text>
                  </Col>
                  <Col>
                    <Heading>Category</Heading>
                    <Category>
                      {deduplicatePosts.map(({ node }) => {
                        return (
                          <CategoryItem key={node.fields.slug}>
                            <CategoryLink
                              to={`/category/${node.frontmatter.categorySlug}/`}
                            >
                              {node.frontmatter.categoryName}
                            </CategoryLink>
                          </CategoryItem>
                        )
                      })}
                    </Category>
                  </Col>
                  <Col>
                    <Heading>Tag</Heading>
                    <Tag>
                      <TagItem>
                        <TagLink to="/">タグ</TagLink>
                      </TagItem>
                      <TagItem>
                        <TagLink to="/">タグ</TagLink>
                      </TagItem>
                      <TagItem>
                        <TagLink to="/">タグ</TagLink>
                      </TagItem>
                      <TagItem>
                        <TagLink to="/">タグ</TagLink>
                      </TagItem>
                      <TagItem>
                        <TagLink to="/">タグ</TagLink>
                      </TagItem>
                      <TagItem>
                        <TagLink to="/">タグ</TagLink>
                      </TagItem>
                      <TagItem>
                        <TagLink to="/">タグ</TagLink>
                      </TagItem>
                      <TagItem>
                        <TagLink to="/">タグ</TagLink>
                      </TagItem>
                      <TagItem>
                        <TagLink to="/">タグ</TagLink>
                      </TagItem>
                    </Tag>
                  </Col>
                </Top>
                <Bottom>
                  <Copyright>
                    {`Copyright © ${author} All rights reserved`}
                  </Copyright>
                </Bottom>
              </Inner>
            </Wrapper>
          </footer>
        )
      }}
    />
  )
}

export const Wrapper = styled.div`
  background: #333;
  color: #fff;
  @media screen and (min-width: 768px) {
    padding-right: 32px;
    padding-left: 32px;
  }
`

export const Inner = styled.div`
  padding: 25px 4% 20px;
  @media screen and (min-width: 768px) {
    max-width: 1120px;
    padding: 43px 0 20px;
    margin: 0 auto;
  }
`

export const Top = styled.div`
  padding-bottom: 24px;
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    padding-bottom: 40px;
  }
`

export const Col = styled.div`
  &:not(:last-child) {
    margin-bottom: 25px;
  }
  @media screen and (min-width: 768px) {
    width: 31%;
    &:not(:last-child) {
      margin-bottom: 0;
    }
  }
`

export const Heading = styled.p`
  font-size: 2.2rem;
  line-height: 1.4;
  margin: 0 0 8px 0;
  font-weight: 700;
  @media screen and (min-width: 768px) {
    margin-bottom: 11px;
  }
`

export const Text = styled.p`
  font-size: 1.4rem;
  line-height: 1.7;
  margin: 0;
`

export const Category = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  line-height: 1.7;
`

export const CategoryItem = styled.li`
  padding-left: 1em;
  text-indent: -1em;
  &:not(:last-child) {
    margin-bottom: 4px;
  }
`

export const CategoryLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  box-shadow: none;
  transition: all 0.2s linear;
  &::before {
    background: url(${linkIcon});
    content: '';
    height: 8px;
    width: 8px;
    background-position: center;
    background-repeat: no-repeat;
    display: inline-block;
    margin-right: 6px;
  }
  &:hover {
    opacity: 0.5;
  }
`

export const Tag = styled.ul`
  font-size: 1.2rem;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`

export const TagItem = styled.li`
  margin: 0 10px 10px 0;
`

export const TagLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  box-shadow: none;
  border: 1px solid #fff;
  border-radius: 6px;
  padding: 1px 10px;
  display: block;
  transition: all 0.2s linear;
  &:hover {
    background-color: #fff;
    color: #333;
    border-color: #fff;
  }
`

export const Bottom = styled.div`
  border-top: 1px solid #666;
  padding-top: 19px;
`

export const Copyright = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin: 0;
`

const footerQuery = graphql`
  query FooterQuery {
    site {
      siteMetadata {
        author
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
            categoryName
            categorySlug
          }
        }
      }
    }
  }
`

export default Footer
