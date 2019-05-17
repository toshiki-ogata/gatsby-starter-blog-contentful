import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import styled from 'styled-components';
import linkIcon from '../../content/assets/link_icon.svg'

function Footer() {
  return (
    <StaticQuery
      query={footerQuery}
      render={data => {
        // const { title } = data.site.siteMetadata
        return (
          <footer>
            <Wrapper>
              <Inner>
                <Top>
                  <Col>
                    <Heading>aa</Heading>
                    <Text>aa</Text>
                  </Col>
                  <Col>
                    <Heading>aa</Heading>
                    <Category>
                      <CategoryItem><CategoryLink to="/">aaa</CategoryLink></CategoryItem>
                      <CategoryItem><CategoryLink to="/">aaa</CategoryLink></CategoryItem>
                      <CategoryItem><CategoryLink to="/">aaa</CategoryLink></CategoryItem>
                    </Category>
                  </Col>
                  <Col>
                    <Heading>aa</Heading>
                    <Tag>
                      <TagItem><TagLink to="/">aaa</TagLink></TagItem>
                      <TagItem><TagLink to="/">aaa</TagLink></TagItem>
                      <TagItem><TagLink to="/">aaa</TagLink></TagItem>
                      <TagItem><TagLink to="/">aaa</TagLink></TagItem>
                      <TagItem><TagLink to="/">aaa</TagLink></TagItem>
                      <TagItem><TagLink to="/">aaa</TagLink></TagItem>
                      <TagItem><TagLink to="/">aaa</TagLink></TagItem>
                      <TagItem><TagLink to="/">aaa</TagLink></TagItem>
                      <TagItem><TagLink to="/">aaa</TagLink></TagItem>
                    </Tag>
                  </Col>
                </Top>
                <Bottom>
                  <Copyright>aaaa</Copyright>
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
  background: #333333;
  color: #fff;
  @media screen and (min-width: 768px) {
    padding-right: 32px;
    padding-left: 32px;
  }
`;

export const Inner = styled.div`
  padding: 25px 4% 20px;
  @media screen and (min-width: 768px) {
    max-width: 1120px;
  }
`;

export const Top = styled.div`
  padding-bottom: 24px;
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const Col = styled.div`
  &:not(:last-child) {
    margin-bottom: 25px;
  }
`;

export const Heading = styled.p`
  font-size: 2.2rem;
  line-height: 1.4;
  margin: 0 0 8px 0;
  font-weight: 700;
`;

export const Text = styled.p`
  font-size: 1.4rem;
`;

export const Category = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const CategoryItem = styled.li`
  margin-bottom: 4px;
  padding-left: 1em;
`;

export const CategoryLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  box-shadow: none;
  &::before {
    background: url(${linkIcon});
    content: "";
    height: 5px;
    width: 8.6px;
    background-position: center;
    background-repeat: no-repeat;
    display: inline-block;
    margin-right: 6px;
    position: absolute;
    /* transform: translateY(2px); */
  }
`;

export const Tag = styled.ul`
  font-size: 1.2rem;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

export const TagItem = styled.li`
  margin: 0 10px 10px 0;
`;

export const TagLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  box-shadow: none;
  border: 1px solid #fff;
  border-radius: 6px;
  padding: 1px 10px;
  display: block;
  transition: all .2s linear;
  &:hover {
    background-color: #fff;
    color: #333;
    border-color: #fff;
  }
`;

export const Bottom = styled.div`
  border-top: 1px solid #666666;
  padding-top: 19px;
`;

export const Copyright = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin: 0;
`;

const footerQuery = graphql`
  query FooterQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default Footer