import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient, useQueries } from "react-query";
import { getUser, updateNickname, getPosts } from "../mocks/api";

export default function Edit() {
  const [inputValue, setInputValue] = useState("");

  const queryClient = useQueryClient();

  // const { data: user } = useQuery("@getUser", getUser, {
  //   staleTime: Infinity,
  // });

  // const { data: posts } = useQuery("@getPosts", getPosts, {
  //   staleTime: Infinity,
  // });

  const results = useQueries([
    { queryKey: ["@getUser"], queryFn: getUser, staleTime: Infinity },
    { queryKey: ["@getPosts"], queryFn: getPosts, staleTime: Infinity },
  ]);

  const mutation = useMutation(updateNickname, {
    onSuccess: () => {
      queryClient.invalidateQueries("@getUser");
    },
  });

  const user = results[0].data;
  const posts = results[1].data;

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(inputValue);
  };

  // if (isLoading) {
  //   return <span>Loading...</span>;
  // }

  return (
    <>
      <h1>Edit</h1>
      <h3>현재 닉네임: {user?.nickName}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          변경할 닉네임:
          <input type="text" value={inputValue} onChange={handleChange} />
        </label>
      </form>
      <ul>
        {posts?.map((post, idx) => (
          <li key={idx}>{post.title}</li>
        ))}
      </ul>
    </>
  );
}
