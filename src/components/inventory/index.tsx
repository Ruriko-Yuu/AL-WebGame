import styled from "styled-components";
import { MouseEvent, useState, useEffect } from "react";
import { FC } from "react";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { selectCount } from "@/features/counter/counterSlice";
import { useSelector } from "react-redux";

// https://codesandbox.io/s/jovial-meadow-2lsr7i?file=/src/Box.tsx:480-683

import update from "immutability-helper";
import { memo, useCallback } from "react";
import { NativeTypes } from "react-dnd-html5-backend";

import { Box } from "./box";
import { Dustbin } from "./bustbin";
import { ItemTypes } from "./itemTypes";

interface DustbinState {
  accepts: string[];
  lastDroppedItem: any;
}

interface BoxState {
  name: string;
  type: string;
}

export interface DustbinSpec {
  accepts: string[];
  lastDroppedItem: any;
}
export interface BoxSpec {
  name: string;
  type: string;
}
export interface ContainerState {
  droppedBoxNames: string[];
  dustbins: DustbinSpec[];
  boxes: BoxSpec[];
}


const InventoryContainer = styled.div`
  ul {
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, 60px);
    grid-template-rows: repeat(auto-fill, 60px);
    grid-auto-flow: row dense;
    li {
      margin: 6px;
      position: relative;
    }
    li::before {
      content: '容器';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
    }
    p {
      position: absolute;
      left: 50%;
      width: 100%;
      height: 100%;
      background-color: #fff;
      transform: translateX(-50%);
      text-align: center;
    }
  }
`;
export const Inventory: FC<{
  size?: [number, number];
}> = ({ size }) => {
  const [containerNum, setContainerNum] = useState(
    size ? size[0] * size[1] : 6 * 5
  );
  const [containerSpace, setContainerSpace] = useState<[] | any[]>([]);

  /** 放置框数组 */
  useEffect(() => {
    const list = [];
    for (let index = 0; index < containerNum; index++) {
      list.push("");
    }
    setContainerSpace(list);
  }, [containerNum]);

  const [dustbins, setDustbins] = useState<DustbinState[]>([
    { accepts: [ItemTypes.GLASS], lastDroppedItem: null },
    { accepts: [ItemTypes.FOOD], lastDroppedItem: null },
    {
      accepts: [ItemTypes.PAPER, ItemTypes.GLASS, NativeTypes.URL],
      lastDroppedItem: null
    },
    { accepts: [ItemTypes.PAPER, NativeTypes.FILE], lastDroppedItem: null }
  ]);

  const [boxes] = useState<BoxState[]>([
    { name: "Bottle", type: ItemTypes.GLASS },
    { name: "Banana", type: ItemTypes.FOOD },
    { name: "Magazine", type: ItemTypes.PAPER }
  ]);

  const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([]);

  function isDropped(boxName: string) {
    return droppedBoxNames.indexOf(boxName) > -1;
  }

  const handleDrop = useCallback(
    (index: number, item: { name: string }) => {
      const { name } = item;
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] })
      );
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item
            }
          }
        })
      );
    },
    [droppedBoxNames, dustbins]
  );

  return (
    <InventoryContainer>
      <DndProvider backend={HTML5Backend}>
        <div style={{ overflow: "hidden", clear: "both" }}>
          {dustbins.map(({ accepts, lastDroppedItem }, index) => (
            <Dustbin
              accept={accepts}
              lastDroppedItem={lastDroppedItem}
              onDrop={(item) => handleDrop(index, item)}
              key={index}
            />
          ))}
        </div>

        <div style={{ overflow: "hidden", clear: "both" }}>
          {boxes.map(({ name, type }, index) => (
            <Box name={name} type={type} key={index} isDropped={false} />
          ))}
        </div>
        {/* <ul style={{ width: `${(size ? size[0] : 6) * 60 }px`, height: `${(size ? size[1] : 5) * 60 }px`}}>
          {containerSpace.map((ele, idx) => (
            <li key={idx}>
              <p>1</p>
            </li>
          ))}
        </ul> */}
      </DndProvider>
    </InventoryContainer>
  );
};
