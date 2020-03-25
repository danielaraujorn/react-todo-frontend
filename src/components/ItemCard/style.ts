import styled, { keyframes } from 'styled-components'
import { Box } from '../Box'

export const Container = styled.div`
  flex: 1;
  width: 100%;
  max-width: 440px;
  padding: 10px 30px;
`
export const TextContainer = styled.div`
  padding: 18px;
  padding-left: 20px;
  padding-right: 0;
  ${({ clickable }: { clickable: boolean }) => clickable && 'cursor:pointer;'}
`
export const Icons = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 10px;
  }
`

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
