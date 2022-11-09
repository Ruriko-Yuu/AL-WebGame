import type { CSSProperties, FC } from "react";
import styled from "styled-components";
import { memo } from "react";
import { useDrop } from "react-dnd";
import { quickFor } from "@/utils/tools";
export interface FieldProps {
  list: any;
}

const FieldContainer = styled.ul`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, 60px);
  grid-template-rows: repeat(auto-fill, 60px);
  grid-auto-flow: row dense;
  li {
    margin: 6px;
    position: relative;
  }
`;

export const Field: FC<FieldProps> = memo(({ list }) => {
  const dropList: any[] = [];
  quickFor(list.length, (i: number) => {
    dropList.push(
      useDrop({
        accept: ["1"],
        drop: (item) => {
          console.log(item, i);
        },
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
      })
    );
  });
  return (
    <FieldContainer style={{ width: "360px", height: "300px" }}>
      {list.map((ele: any, idx: number) => (
        <li ref={dropList[idx][1]} key={idx}>
          {1}
        </li>
      ))}
    </FieldContainer>
  );
});
