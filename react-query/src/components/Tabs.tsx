import React from "react";
import styled from "@emotion/styled";
import { Color } from "../types";
import { mapColorToHex } from "../utils";

const List = styled.ul`
  list-stlye: none;
  margin: 0;
  padding: 0;
  display: flex;
`;

const ListItme = styled.li`
  & + & {
    margin-left: 16px;
  }
`;

const TabButton = styled.button<{ active?: boolean; color: string }>`
  margin: 0;
  border-radius: 8px;
  box-shadow: 6px 4px 14px 5px rgba(0, 0, 0, 0.21);
  padding: 6px 12px;
  background-color: #fff;
  border: none;
  font-size: 16px;
  color: ${({ active, color }) => (active ? color : "#6B7280")};
`;

interface Props {
  tab: "about" | "stats" | "evolution";
  onClick: (tab: "about" | "stats" | "evolution") => void;
  color?: Color;
}

const Tabs: React.FC<Props> = ({ tab, onClick, color }) => {
  return (
    <List>
      <ListItme onClick={() => onClick("about")}>
        <TabButton active={tab === "about"} color={mapColorToHex(color?.name)}>
          About
        </TabButton>
      </ListItme>
      <ListItme
        onClick={() => onClick("stats")}
        color={mapColorToHex(color?.name)}
      >
        <TabButton active={tab === "stats"}>Stats</TabButton>
      </ListItme>
      <ListItme
        onClick={() => onClick("evolution")}
        color={mapColorToHex(color?.name)}
      >
        <TabButton active={tab === "evolution"}>Evolution</TabButton>
      </ListItme>
    </List>
  );
};

export default Tabs;
