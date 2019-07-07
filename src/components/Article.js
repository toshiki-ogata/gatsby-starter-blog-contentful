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
    const linkDisplayCopy = linkDisplay.slice()
    let itemCount = 0
    for (let i = 0; i < linkDisplay.length; i++) {
      if (linkDisplay[i] === 'none' && itemCount < totalPosts) {
        linkDisplayCopy[i] = 'block'
        itemCount = itemCount + 1
      }
    }
    this.setState({ linkDisplay: linkDisplayCopy })
  }
  render() {
    const { posts } = this.props
    const { linkDisplay } = this.state
    return (
      <Wrapper ref={this.linkRef}>
        {posts.map(({ node }, index) => {
          return (
            <StyledLink
              key={node.slug}
              to={node.slug}
              displayflag={linkDisplay[index]}
            >
              <Item>
                <Img fluid={node.thumbnail.fluid} />
                <Body>
                  <Heading>{node.title}</Heading>
                  <PublishDate>{node.publishDate}</PublishDate>
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
  grid-column-gap: 4%;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  justify-content: center;
  @media screen and (min-width: 768px) {
    grid-column-gap: 32px;
    grid-row-gap: 40px;
  }
`

export const StyledLink = styled(Link)`
  color: #333;
  text-decoration: none;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16);
  border-radius: 6px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s;
  overflow: hidden;
  display: ${props => (props.displayflag === 'block' ? 'block' : 'none')};
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(46, 41, 51, 0.08),
      0 8px 16px rgba(71, 63, 79, 0.16);
  }
`

export const Item = styled.article`
  margin: 0;
`

export const Body = styled.div`
  padding: 15.2px 4% 20px;
  @media screen and (min-width: 768px) {
    padding: 18.6px 24px 24px;
  }
`

export const Heading = styled.h3`
  margin: 0 0 7px 0;
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 1.6;
  @media screen and (min-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 14.6px;
  }
`

export const PublishDate = styled.time`
  font-size: 1.4rem;
  line-height: 1;
`

export default Article
