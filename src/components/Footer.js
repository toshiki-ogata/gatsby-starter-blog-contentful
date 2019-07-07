import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import linkIcon from '../../content/assets/link_icon.svg'
import twitterIcon from '../../content/assets/twitter.svg'
import facebookIcon from '../../content/assets/facebook.svg'
import instagramIcon from '../../content/assets/instagram.svg'
import youtubeIcon from '../../content/assets/youtube.svg'

function Footer() {
  return (
    <StaticQuery
      query={footerQuery}
      render={data => {
        const icon = [twitterIcon, facebookIcon, instagramIcon, youtubeIcon]
        const { author, social } = data.site.siteMetadata
        const SnsArray = Object.keys(social).map(function(key) {
          return social[key]
        })
        const posts = data.allContentfulPost.edges
        const deduplicatePosts = posts.filter(function(v1, i1, a1) {
          return (
            a1.findIndex(function(v2) {
              return v1.node.categorySlug === v2.node.categorySlug
            }) === i1
          )
        })
        deduplicatePosts.sort((a, b) => {
          const nameA = a.node.categorySlug
          const nameB = b.node.categorySlug
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
                          <CategoryItem key={node.slug}>
                            <CategoryLink
                              to={`/category/${node.categorySlug}/`}
                            >
                              {node.categoryName}
                            </CategoryLink>
                          </CategoryItem>
                        )
                      })}
                    </Category>
                  </Col>
                  <Col>
                    <Heading>SNS</Heading>
                    <Sns>
                      {SnsArray.map((value, index) => {
                        if (value) {
                          return (
                            <SnsItem key={SnsArray[index]}>
                              <SnsLink href={value}>
                                <SnsImage
                                  src={icon[index]}
                                  alt={SnsArray[index]}
                                />
                              </SnsLink>
                            </SnsItem>
                          )
                        }
                      })}
                    </Sns>
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

export const Sns = styled.ul`
  display: flex;
  list-style: none;
`

export const SnsItem = styled.li`
  padding: 0;
  &:not(:first-child) {
    margin-left: 8px;
  }
`

export const SnsLink = styled.a.attrs((/* props */) => ({
  target: '_blank',
  rel: 'noreferrer noopener',
}))`
  transition: all 0.2s linear;
  &:hover {
    opacity: 0.5;
  }
`

export const SnsImage = styled.img`
  width: 24px;
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
        social {
          twitter
          facebook
          instagram
          youtube
        }
      }
    }
    allContentfulPost(sort: { fields: publishDate, order: DESC }) {
      edges {
        node {
          categoryName
          categorySlug
          slug
        }
      }
    }
  }
`

export default Footer
