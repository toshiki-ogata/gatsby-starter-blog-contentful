import { css } from 'styled-components'

const mixins = {
  mq: (...args) => css`
    @media (min-width: 768px) {
      ${css(...args)};
    }
  `,
}

export default mixins
