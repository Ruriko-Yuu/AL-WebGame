import type { CSSProperties, FC } from "react";
import { memo } from "react";
import { useDrag } from "react-dnd";

const style: CSSProperties = {
  border: "1px dashed gray",
  backgroundColor: "white",
  width: "100%",
  height: "100%",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left"
};

export interface BoxProps {
  item: any;
}

export const Item: FC<BoxProps> = memo(function Box({ item }) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: item.type,
      item: item,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1
      })
    }),
    [item]
  );

  return (
    <div ref={drag} style={{ ...style, opacity }} data-testid="box">
      {item.name}
    </div>
  );
});
