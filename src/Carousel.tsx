import React, {
  ReactNode,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react'
import _ from 'lodash'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
`

const Arrow = styled.div`
  width: 30px;
  text-align: center;
  cursor: pointer;
`

const Viewport = styled.div`
  width: calc(100% - 60px);
  position: relative;
  white-space: nowrap;
  overflow: auto;
`

const Film = styled.div<{ padding: number; shift: number }>`
  position: absolute;
  padding-left: ${({ padding }) => `${padding}px`};
  display: flex;
  left: ${({ shift }) => `-${shift}px`};
  transition: left 0.6s ease;
`

const Item = styled.div<{ margin: number; width: number | null }>`
  margin-right: ${({ margin }) => `${margin}px;`}
  width: ${({ width }) => (width ? `${width}px` : 'default')};
`

const Carousel: React.FC<{ items: ReactNode[]; margin: number }> = ({
  items,
  margin,
}) => {
  const [itemWidth, setItemWidth] = useState<number | null>(null)
  const [initialItemWidth, setInitialItemWidth] = useState<number | null>(null)
  const [viewportWidth, setViewportWidth] = useState<number | null>(null)
  const [pageSize, setPageSize] = useState<number>(0)
  const [firstPosition, setFirstPosition] = useState<number>(0)
  const viewportRef = useRef<HTMLDivElement>(null)
  const filmRef = useRef<HTMLDivElement>(null)

  const shift = useCallback(
    (direction: number) => {
      if (items.length <= pageSize) {
        return
      }
      const nextPosition = firstPosition + direction
      const lastPosition = items.length - pageSize
      if (direction < 0 && nextPosition < 0) {
        setFirstPosition(lastPosition)
        return
      }
      if (direction > 0 && nextPosition > lastPosition) {
        setFirstPosition(0)
        return
      }
      setFirstPosition(nextPosition)
    },
    [firstPosition, pageSize]
  )

  useEffect(() => {
    if (!viewportRef.current) {
      return
    }
    const { width: viewportWidth } = viewportRef.current.getBoundingClientRect()
    setViewportWidth(viewportWidth)
  }, [viewportRef.current])

  useEffect(() => {
    if (!items || !items.length || !filmRef?.current) {
      return
    }
    const item = filmRef.current.children?.[0]
    if (!item) {
      return
    }
    const { width: initialItemWidth } = item.getBoundingClientRect()
    setInitialItemWidth(initialItemWidth)
  }, [items, filmRef.current])

  useEffect(() => {
    if (!initialItemWidth || !viewportWidth) {
      return
    }
    const pageSize = Math.floor(
      (viewportWidth - margin) / (initialItemWidth + margin)
    )
    setPageSize(pageSize)
    setItemWidth((viewportWidth - margin - pageSize * margin) / pageSize)
  }, [initialItemWidth, viewportWidth])

  return (
    <Container>
      <Arrow onClick={() => shift(-1)}>{'<'}</Arrow>
      <Viewport ref={viewportRef}>
        <Film
          padding={margin}
          ref={filmRef}
          shift={firstPosition * (margin + (itemWidth || 0))}
        >
          {_.map(items, (item: ReactNode) => (
            <Item key={Math.random()} margin={margin} width={itemWidth}>
              {item}
            </Item>
          ))}
        </Film>
      </Viewport>
      <Arrow onClick={() => shift(1)}>{'>'}</Arrow>
    </Container>
  )
}

export default Carousel
