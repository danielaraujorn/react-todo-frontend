import React, { useMemo } from 'react'
import * as Styled from './style'
export const ItemsLoading = ({ total = 4 }: { total?: number }) => {
  const array = useMemo(() => new Array(total).fill({}), [total])
  return (
    <>
      {array.map((_, index) => (
        <Styled.LoadingBox key={index} index={index} total={total} />
      ))}
    </>
  )
}
