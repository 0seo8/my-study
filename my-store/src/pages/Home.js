import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getUser } from "../mocks/api";

export default function Home() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery("@getUser", getUser);

  // suspense모드를 사용하고 있기 때문에 주석
  // if (isLoading) return <span>Loading....</span>;

  return (
    <div>
      <h1>Home, Hello {data.nickName}</h1>
      <button onClick={() => navigate("/edit")}>Go Edit Page</button>
    </div>
  );
}
