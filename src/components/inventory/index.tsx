import styled from "styled-components";
import { MouseEvent, useState, useEffect } from "react";
import { FC } from "react";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { selectCount } from "@/features/counter/counterSlice";
import { useSelector } from "react-redux";
// https://codesandbox.io/s/jovial-meadow-2lsr7i?file=/src/Box.tsx:480-683
// https://codesandbox.io/s/jovial-meadow-2lsr7i?file=/src/Box.tsx:480-683
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

  return (
    <InventoryContainer>
      <DndProvider backend={HTML5Backend}>
        <ul style={{ width: `${(size ? size[0] : 6) * 60 }px`, height: `${(size ? size[1] : 5) * 60 }px`}}>
          {containerSpace.map((ele, idx) => (
            <li key={idx}>
              <p>1</p>
            </li>
          ))}
        </ul>
      </DndProvider>
    </InventoryContainer>
  );
};
