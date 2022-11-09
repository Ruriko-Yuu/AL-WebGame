import type { CSSProperties, FC } from 'react'
import { memo } from 'react'
import { useDrop } from 'react-dnd'

export interface FieldProps {
  info: {[key:string]: string}
  onDrop: (item: any) => void
}

export const Field: FC<FieldProps> = memo(({
  info,
  onDrop
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ['1'],
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  return <li ref={drop}>{1}</li>
})