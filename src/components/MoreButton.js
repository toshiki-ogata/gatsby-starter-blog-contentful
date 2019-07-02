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
  margin-top: 56px;
  display: ${props => (props.displayflag === 'block' ? 'block' : 'none')};
  @media screen and (min-width: 768px) {
    margin-top: 80px;
  }
`

export const Button = styled.button`
  margin-bottom: 29.5px;
  min-width: 200px;
  line-height: 1.4;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  background: #fff;
  color: #333;
  border: 2px solid #333;
  text-decoration: none;
  display: inline-block;
  padding: 14px 20px;
  border-radius: 6px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.2s linear;
  &:hover {
    background: #333;
    color: #fff;
  }
  @media screen and (min-width: 768px) {
    margin-bottom: 52px;
  }
`

export default MoreButton
