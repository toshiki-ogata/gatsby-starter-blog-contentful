import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

class Article extends React.Component {
  constructor(props) {
    super(props)
    const { posts, totalPosts } = this.props
    let linkDisplayArray = []
    for (let i = 0; i < posts.length; i++) {
      if (i < totalPosts) {
        linkDisplayArray.push('block')
      } else {
        linkDisplayArray.push('none')
      }
    }
    this.state = {
      linkDisplay: linkDisplayArray,
    }
    this.linkRef = React.createRef()
  }
  showItem() {
    const { totalPosts } = this.props
    const { linkDisplay } = this.state
    const linkDisplay_copy = linkDisplay.slice()
    let itemCount = 0
    for (let i = 0; i < linkDisplay.length; i++) {
      if (linkDisplay[i] === 'none' && itemCount < totalPosts) {
        linkDisplay_copy[i] = 'block'
        itemCount = itemCount + 1
      }
    }
    this.setState({ linkDisplay: linkDisplay_copy })
  }
  render() {
    const { posts } = this.props
    const { linkDisplay } = this.state
    return (
      <Wrapper ref={this.linkRef}>
        {posts.map(({ node }, index) => {
          return (
            <StyledLink
              key={node.fields.slug}
              to={node.fields.slug}
              displayflag={linkDisplay[index]}
            >
              <Item>
                <Img fluid={node.frontmatter.tmb.childImageSharp.fluid} />
                <Body>
                  <Heading>{node.frontmatter.title}</Heading>
                  <Date>{node.frontmatter.date}</Date>
                </Body>
              </Item>
            </StyledLink>
          )
        })}
      </Wrapper>
    )
  }
}

export const Wrapper = styled.div`
  display: grid;
  grid-row-gap: 32px;
  grid-template-columns: repeat(auto-fill, minmax(auto, 450px));
  justify-content: center;
  @media screen and (min-width: 768px) {
    grid-column-gap: 32px;
    grid-row-gap: 40px;
    grid-template-columns: repeat(auto-fill, 352px);
  }
`

export const StyledLink = styled(Link)`
  color: #333;
  text-decoration: none;
  box-shadow: none;
  display: ${props => (props.displayflag === 'block' ? 'block' : 'none')};
`

export const Item = styled.article`
  margin: 0;
  border-bottom: 1px solid #eaeaea;
  @media screen and (min-width: 768px) {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
    border-bottom: none;
  }
`

export const Body = styled.div`
  padding: 12px 0 30px;
  @media screen and (min-width: 768px) {
    padding: 19px 24px 21px;
  }
`

export const Heading = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 1.4;
  @media screen and (min-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 11px;
  }
`

export const Date = styled.time`
  font-size: 1.2rem;
  line-height: 1;
  @media screen and (min-width: 768px) {
    font-size: 1.4rem;
  }
`

export default Article
