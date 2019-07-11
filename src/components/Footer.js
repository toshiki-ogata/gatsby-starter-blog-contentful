import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const config = require('../utils/siteConfig')
const _ = require("lodash")

function Footer() {
  return (
    <StaticQuery
      query={footerQuery}
      render={data => {
        const SnsIcon = [
          ['fab', 'twitter'],
          ['fab', 'facebook'],
          ['fab', 'instagram'],
          ['fab', 'youtube'],
          ['fab', 'github'],
          'rss',
        ]
        const SnsArray = Object.keys(config.social).map(function(key) {
          return config.social[key]
        })
        const posts = data.allContentfulPost.edges
        const deduplicatePosts = posts.filter(function(v1, i1, a1) {
          return (
            a1.findIndex(function(v2) {
              return v1.node.category === v2.node.category
            }) === i1
          )
        })
        deduplicatePosts.sort((a, b) => {
          const nameA = a.node.category
          const nameB = b.node.category
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
          return 0
        })

        let tags = []
        _.each(posts, edge => {
          if (_.get(edge, "node.tag")) {
            tags = tags.concat(edge.node.tag)
          }
        })
        tags = _.uniq(tags)

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
                    <Sns>
                      {SnsArray.map((value, index) => {
                        if (value) {
                          return (
                            <SnsItem key={SnsArray[index]}>
                              <SnsLink href={value}>
                                <FontAwesomeIcon
                                  icon={SnsIcon[index]}
                                  size="lg"
                                />
                              </SnsLink>
                            </SnsItem>
                          )
                        }
                      })}
                    </Sns>
                  </Col>
                  <Col>
                    <Heading>Category</Heading>
                    <Category>
                      {deduplicatePosts.map(({ node }) => {
                        return (
                          <li key={node.slug}>
                            <CategoryLink
                              to={`/category/${node.category}/`}
                            >
                              <Icon icon="angle-right" size="sm" />
                              {node.category}
                            </CategoryLink>
                          </li>
                        )
                      })}
                    </Category>
                  </Col>
                  <Col>
                    <Heading>Tag</Heading>
                    <Tag>
                      {tags.map((value) => {
                        return (
                          <TagItem key={value}>
                            <TagLink to={`/tag/${value}/`}>
                              <Icon icon="tag" size="sm" />{value}</TagLink>
                          </TagItem>
                          )
                        })}
                    </Tag>
                  </Col>
                </Top>
                <Bottom>
                  <Copyright>{config.copyright}</Copyright>
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
  background: ${props => props.theme.colors.base};
  color: #fff;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    padding-right: 32px;
    padding-left: 32px;
  }
`

export const Inner = styled.div`
  padding: 25px 4% 20px;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    max-width: 1120px;
    padding: 43px 0 20px;
    margin: 0 auto;
  }
`

export const Top = styled.div`
  padding-bottom: 24px;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    display: flex;
    justify-content: space-between;
    padding-bottom: 40px;
  }
`

export const Col = styled.div`
  &:not(:last-child) {
    margin-bottom: 25px;
  }
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    width: 31%;
    &:not(:last-child) {
      margin-bottom: 0;
    }
  }
`

export const Heading = styled.p`
  font-size: 2.2rem;
  line-height: ${props => props.theme.lineHeight.small};
  margin: 0 0 19.6px 0;
  font-weight: ${props => props.theme.fontWeight.large};
`

export const Text = styled.p`
  font-size: 1.4rem;
  line-height: ${props => props.theme.lineHeight.medium};
  margin: 0;
`

export const Category = styled.ul`
  font-size: 1.4rem;
  list-style: none;
  line-height: ${props => props.theme.lineHeight.medium};
`

export const CategoryLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  box-shadow: none;
  transition: all 0.2s linear;
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
  margin: 0 16px 16px 0;
`

export const TagLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  display: block;
  transition: all 0.2s linear;
  line-height: 1;
  &:hover {
    opacity: 0.5;
  }
`

export const Icon = styled(FontAwesomeIcon)`
  margin-right: 0.5em;
`

export const Sns = styled.ul`
  display: flex;
  list-style: none;
  margin-top: 18.4px;
`

export const SnsItem = styled.li`
  padding: 0;
  &:not(:first-child) {
    margin-left: 8px;
  }
`

export const SnsLink = styled.a.attrs(() => ({
  target: '_blank',
  rel: 'noreferrer noopener',
}))`
  transition: all 0.2s linear;
  color: #fff;
  &:hover {
    opacity: 0.5;
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
    allContentfulPost(sort: { fields: createdAt, order: DESC }) {
      edges {
        node {
          slug
          category
          tag
        }
      }
    }
  }
`

export default Footer
