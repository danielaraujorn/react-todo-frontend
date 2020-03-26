import styled, { keyframes } from 'styled-components'
import { Box } from '../Box'

const ElevationAnimation = (opacity: number) => keyframes`  
from { opacity: ${opacity}; }
to { opacity: 0; }
`

export const LoadingBox = styled(Box)<{ index: number; total: number }>`
  height: 54px;
  opacity: ${({ index = 0, total = 1 }) => (total - index) / total};
  animation-name: ${({ index = 0, total = 1 }) =>
    ElevationAnimation((total - index) / total)};
  animation-iteration-count: infinite;
  animation-duration: 600ms;
  animation-direction: alternate;
  animation-delay: ${({ index = 0 }) => index * 100}ms;
`
