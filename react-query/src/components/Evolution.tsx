import React from "react";
import styled from "@emotion/styled";
import { Color } from "../types";
import { mapColorToHex } from "../utils";

const Base = styled.div`
  margin-top: 32px;
  padding: 0 20px 20px;
`;

const Title = styled.h4<{ color: string }>`
  margin: 0;
  padding: 0;
  font-size: 20px;
  font-weight: bold;
  color: ${({ color }) => color};
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
`;

const List = styled.ul`
  list-style: none;
  margin: 20px 0 0 0;
  padding: 0;
  > li + li {
    margin-top: 24px;
  }
`;

const EmptyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 444px);
`;

const Empty = styled.div<{ color: string }>`
  color: ${({ color }) => color};
`;

interface Props {
  isLoading: boolean;
  id?: string;
  color?: Color;
  url?: string;
}

const Evolution: React.FC<Props> = ({ url, color }) => {
  return (
    <Base>
      <Title color={mapColorToHex(color?.name)}>Evolution</Title>
      <List></List>
    </Base>
  );
};

export default Evolution;
