import React from 'react'
import styled from 'styled-components'

const Section = props => {
  const { children } = props
  return <Wrapper>{children}</Wrapper>
}

export const Wrapper = styled.section`
  margin-bottom: 56px;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    margin-bottom: 80px;
  }
`

export default Section
