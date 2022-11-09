import styled from "styled-components";
import { MouseEvent, useState, useEffect } from "react";
import { FC } from "react";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Field } from "./field";
import { Item } from "./item";
import { quickFor } from '@/utils/tools'
export const Inventory: FC<{
  size?: [number, number];
}> = ({ size }) => {
  const [containerNum, setContainerNum] = useState(
    size ? size[0] * size[1] : 6 * 5
  );
  const initial: any[] | (() => any[]) = []
  quickFor(30, (i: number) => {
    initial.push({ index: i })
  })
  const [fieldList, setFieldList] = useState(initial);
  const [boxes] = useState([
    { name: "Bottle", type: "1" },
    { name: "Banana", type: "2" },
    { name: "Magazine", type: "3" },
  ]);
  return (
    <DndProvider backend={HTML5Backend}>
      <Field list={fieldList} />
      {boxes.map((item, index) => (
        <Item item={item} key={index} />
      ))}
    </DndProvider>
  );
};
