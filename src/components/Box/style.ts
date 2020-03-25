import styled from 'styled-components'

export const Side = styled.div`
  height: fit-content;
  margin: auto 12px;
`

export type variantType = 'concave' | 'convex' | 'inset'

const getBackground = (variant?: variantType): string => {
  if (variant === 'concave' || variant === 'inset')
    return 'linear-gradient(135deg, rgba(0,0,0,0.08), rgba(200,200,200,0))'
  else {
    //convex
    return 'linear-gradient(-45deg, rgba(0,0,0,0.02), rgba(255,255,255,0.08))'
  }
}

const getShadow = (variant?: variantType): string => {
  if (variant === 'inset')
    return `0px 0px 0px 0 rgba(0, 0, 0, 0),
    -0px -0px 0px 0 rgba(255, 255, 255, 0),
    6px 6px 8px 0 rgba(0, 0, 0, 0.15) inset,
    -6px -6px 13px 0 rgba(255, 255, 255, 0.08) inset`
  else if (variant === 'concave')
    return `6px 6px 8px 0 rgba(0, 0, 0, 0.15),
    -4px -4px 18px 0 rgba(255,255,255,0.15),
     6px 6px 20px 0 rgba(0, 0, 0, 0.15) inset,
     -6px -6px 20px 0 rgba(255, 255, 255, 0.1) inset`
  else {
    //convex
    return `6px 6px 8px 0 rgba(0,0,0,0.15),
    -4px -4px 18px 0 rgba(255,255,255,0.15),
    -6px -6px 8px 0 rgba(0,0,0,0.03) inset,
    0px 0px 0px 0 rgba(255,255,255,0) inset`
  }
}

export const Container = styled.div`
  background: ${({ variant }: { variant?: variantType }) =>
    getBackground(variant)};
  box-shadow: ${({ variant }: { variant?: variantType }) => getShadow(variant)};
  border-radius: 30px;
  display: flex;
  transition-duration: 300ms;
`
export const FullWidth = styled.div`
  flex: 1;
`
