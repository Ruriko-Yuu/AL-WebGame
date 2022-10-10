import styled from 'styled-components';
import { MouseEvent, useState } from 'react'
import { getMaxZIndex } from '@/utils/tools'
import { FC } from 'react';
import { selectCount } from '@/features/counter/counterSlice'
import { useSelector } from 'react-redux';
const PopupContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  figure {
    position: relative;
    display: inline-block;
    min-width: 200px;
    background-color: #fff;
    margin: 0;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgb(26 26 26 / 10%);
    pointer-events: all;
    .header {
      padding: 5px;
      cursor: all-scroll;
      border-bottom: 1px solid #eee;
    }
    .body {
      padding: 0 5px;
    }
    .footer {
      padding: 5px;
    }
  }
`
export const Popup:FC<{
  close: (e: false) => void,
  header?: any,
  body?: any,
  footer?: any,
}> = ({close, header, body, footer}) => {
  const [startMouseCoordinates, setStartMouseCoordinates] = useState<(number | null)[]>([null, null])
  const [startHtmlCoordinates, setStartHtmlCoordinates] = useState<number[]>([0, 0])
  const [htmlCoordinates, setHtmlCoordinates] = useState<number[]>([0, 0])
  const [zIndex, setZIndex] = useState(getMaxZIndex().maxZIndex)
  const count = useSelector(selectCount);

  const startPopupmove = (e:any) => {
    setStartMouseCoordinates([e.pageX, e.pageY])
    setStartHtmlCoordinates(htmlCoordinates)
    const maxZIndex = getMaxZIndex().maxZIndex
    const maxZIndexNum = getMaxZIndex().maxZIndexNum
    if (zIndex < maxZIndex || (zIndex === maxZIndex && maxZIndexNum > 1)) {
      setZIndex(maxZIndex + 1)
    }
  }
  const popupMove = (e: any) => {
    if (startMouseCoordinates[0] === null || startMouseCoordinates[1] === null) return
    setHtmlCoordinates([
      startHtmlCoordinates[0] - startMouseCoordinates[0] + e.pageX,
      startHtmlCoordinates[1] - startMouseCoordinates[1] + e.pageY,
    ])
  }
  const endPopupMove = () => {
    setStartMouseCoordinates([null, null])
  }
  return (
    <PopupContainer
      onMouseMove={(e) => {popupMove(e)}}
      onMouseUp={endPopupMove}
      style={{
        pointerEvents: startMouseCoordinates[0] === null ? 'none' : 'all',
        zIndex: zIndex
      }}
    >
      <figure style={{left: `${htmlCoordinates[0]}px`, top: `${htmlCoordinates[1]}px`}}>
        <div className="header" onMouseDown={(e) => {startPopupmove(e)}}>
          {header}
        </div>
        <div className="body" onClick={()=> close(false)}>
          {body}{count}
        </div>
        <div className="footer">
          {footer}
        </div>
      </figure>
    </PopupContainer>
  )
}