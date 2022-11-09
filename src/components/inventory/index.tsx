import styled from "styled-components";
import { MouseEvent, useState, useEffect } from "react";
import { FC } from "react";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Field } from "./field";
import { Item } from "./item";

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
      content: "容器";
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
  const [fieldList, setFieldList] = useState([{ value: "empty" }]);

  const [boxes] = useState([
    { name: "Bottle", type: "1" },
    { name: "Banana", type: "2" },
    { name: "Magazine", type: "3" },
  ]);
  return (
    <InventoryContainer>
      <DndProvider backend={HTML5Backend}>
        {fieldList.map((ele, idx) => (
          <Field
            onDrop={(item) => {
              console.log(item);
            }}
            info={ele}
            key={idx}
          />
        ))}
        {boxes.map(({ name, type }, index) => (
          <Item name={name} type={type} key={index} isDropped={false} />
        ))}
      </DndProvider>
    </InventoryContainer>
  );
};
