import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components';
import Image from "../components/Image"
// import Img from 'gatsby-image'

class Article extends React.Component {
  render() {
    const { link, title, date, tmb } = this.props
    return (
      <StyledLink to={link}>
        <Item>
          <Image filename={tmb} />
          {/* <img src={tmb} /> */}
          <Body>
            <Heading>{title}</Heading>
            <Date>{date}</Date>
          </Body>
        </Item>
      </StyledLink>
    )
  }
}

export const StyledLink = styled(Link)`
  color: #333;
  text-decoration: none;
  box-shadow: none;
`

export const Item = styled.article`
  margin: 0;
  border-bottom: 1px solid #EAEAEA;
  @media screen and (min-width: 768px) {
    box-shadow: 0 3px 6px rgba(0, 0, 0, .08);
    border-bottom: none;
  }
`;

// export const Image = styled.img`
//   margin: 0;
//   vertical-align: bottom;
//   width: 100%;
//   @media screen and (min-width: 768px) {
    
//   }
// `;

export const Body = styled.div`
  padding: 12px 0 30px;
  @media screen and (min-width: 768px) {
    padding: 19px 24px 21px;
  }
`;

export const Heading = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 1.4;
  @media screen and (min-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 11px;
  }
`;

export const Date = styled.time`
  font-size: 1.2rem;
  line-height: 1;
  @media screen and (min-width: 768px) {
    font-size: 1.4rem;
  }
`;

export default Article