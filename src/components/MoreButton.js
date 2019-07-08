import React from 'react'
import styled from 'styled-components'

class MoreButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: 'block',
    }
  }

  hiddenItem() {
    this.setState({ display: 'none' })
  }

  render() {
    const { moreClick } = this.props
    const { display } = this.state
    return (
      <Wrapper displayflag={display}>
        <Button onClick={moreClick}>もっと見る</Button>
      </Wrapper>
    )
  }
}

export const Wrapper = styled.div`
  text-align: center;
  margin-bottom: 56px;
  display: ${props => (props.displayflag === 'block' ? 'block' : 'none')};
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    margin-bottom: 80px;
  }
`

export const Button = styled.button`
  min-width: 200px;
  line-height: ${props => props.theme.lineHeight.small};
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  background: ${props => props.theme.colors.base};
  color: #fff;
  text-decoration: none;
  display: inline-block;
  padding: 15px 20px;
  border-radius: 6px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(46, 41, 51, 0.08),
      0 8px 16px rgba(71, 63, 79, 0.16);
  }
`

export default MoreButton
