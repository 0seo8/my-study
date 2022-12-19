import React from "react";
import { useParams } from "react-router-dom";

type Params = {
  id: string;
};

const DetailPage: React.FC = () => {
  const { id } = useParams<Params>();
  return <div>DetailPage : {id}</div>;
};

export default DetailPage;
