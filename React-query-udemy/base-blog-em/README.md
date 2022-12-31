# 리액트 쿼리

## 1. Client State vs Server State

- 클라이언트 상태란?

  - 웹 브라우저 세션과 관련된 모든 정보를 의미
  - 단순히 사용자의 샅애를 추적하는 것
  - ex )사용자는 텍스트를 읽기 위해 언어를 선택하거나 색의 테마를 바꿀 수 있음

- 서버상태
  - 서버에 저장되지만 클라이언트에 표시하는데 필요한 데이터
  - ex)데이터베이스에 저장하는 블로그 게시판

## 2. 리액트 쿼리

### 2-1 리액트 쿼리란?

- 서버 데이터 캐시를 관리
- 리액트 코드에 서버 데이터가 필요할 때, fetch나 axios를 사용해 서버로 바로 이동하지 않고, 리액트 쿼리 캐시를 요청
- 리액트 쿼리가 서버 데이터에 대한 공급원
- 즉, 리액트 쿼리는 리액트 쿼리 클라이언트를 어떻게 구성했느냐에 따라 해당 캐시의 데이터를 유지 관리할 수 있습니다.
- 데이터를 관리하는 것은 서버이지만, 서버의 새 데이터로 캐시를 업데이트하는 시기를 설정하는 것은 사용자 몫임.

## 2-2 서버의 새 데이터로 캐시 업데이트 하기.

```js
key: 'blog-post',
data: [
  1: {
    title: 'React Qeury',
    tagLine: 'What is this thing?'
  },
  2: {
    title: 'React Query Mutations',
    tagLine: 'Not just for ninja turtles'
  }
]
staleTime: 30 seconds
```

1. 명령형: 캐시에 교체할 새 데이터를 서버에서 가져오게 지시
2. 선언형: 리패치를 트리거하는 조건을 구성
   ex) 30초 후에 브라우저 창이 다시 포커스되는 경우, 서버에서 새 데티터를 가져오도록 함

## 2-3 서버 상태관리에 도움되는 많은 도구들을 제공

- Loading, Error state
  - 서버에 대한 모든 쿼리의 로딩 및 오류상태를 유지해주기 때문에 수동으로 설정할 필요가 없습니다
- Pagination / Infinte scroll
  - 사용자를 위해 필요한 경우 데이터를 조각으로 가져올 수 있는 도구 제공(페이지네이션, 무한스크롤 등) 합니다.
- Prefectching
  - 데이터를 미리 가져와서 캐시에 넣어둠으로써, 사용자에게 데이터가 필요할 때 앱이 캐시에서 해당 데이터를 가져오기 때문에 사용자는 서버에 연결할 때까지 기다릴 필요가 없습니다.
- Mutation
  - 리액트 쿼리가 데이터의 변이나 업데이트를 관리할 수 있습니다
- De-duplication of requests
  - 쿼리가 키로 관리가 되기 때문에 페이지를 로드하고 해당 페이지의 구성 구성요소가 동일한 데이터을 요청하는 경우 리액트쿼리는 쿼리를 한번에 보낼 수 있습니다.
- Retry on error
  - 오류가 발생하는 경우 다시 한번 시도를 할 수 있습니다.
- Callbaks
  - 쿼리가 성공하거나 오류가 났을 때를 구별하여 조치를 취하도록 콜백을 전달할 수도 있습니다.

## 3. 각각 상세설명

### 1)isFetching

- 비동기 쿼리가 해결되지 않았다.
- Axios 호출 또는 GraphQL 호출 일 수도 있음

### 2)isLoading

- isFetching의 하위 집합
- 가져오는 상태에 있는 것을 의미
- 쿼리함수가 아직 해결되지 않았으며 캐시된 데이터도 없음
- 즉, 데이터를 가져오는 중이며 표시할 캐시도 없다.

### 3)isError

- 데이터를 가져오는데 error가 발생하는 경우 기본적으로 3번 다시 시도를 한 후 데이터를 가지고 올 수 없다고 판단을 합니다.

### 4)error

- 어떤 오류가 나는지를 확인할 수 있습니다.

예시)

```jsx
const { data, isError, isLoading, error } = useQuery("post", fetchPosts);
if (isLoading) return <h3>Loading</h3>;
if (isError)
  return (
    <>
      <h3>Oops, Something is wrong</h3>
      <p>{error.toString()}</p>
    </>
  );
```

위 경우 데이터를 3번 리페치 하기 전까지는 화면에 Loading이 표시되다가 Oops, Something is wrong + 에러메세지 가 표시되게 됩니다.

### 5)onError

- useQuery에 옵션으로 전달 할 수 있으며, 오류를 조금 더 세련되게 표시를 할 수 있습니다.

## 4. React Qeury Dev Tools

### 4-1 React Qeury Dev Tools란?

- 쿼리 키로 쿼리를 표시해 주며, active, inactive, stale 등 모든 쿼리의 상태를 알려줍니다.
- 마지막으로 업데이트된 타임스탬프도 알려줍니다.
- 쿼리에 의해 반환된 데이터를 확인할 수 있는 데이터 탐색기도 있습니다.
- 쿼리를 볼 수 있는 쿼리 탐색기도 있습니다.
- https://react-query.tanstack.com/devtools

### 4-2 주의점

- 기본적으로 dev tools는 프로덕션 번들에 포함되어 있지 않습니다.
- NODE_ENV변수에 따라 프로덕션 환경에 있는지 여부가 결정됩니다.
- Create React 엡은 npm run build를 실행할 때만 NODE_ENV변수를 production으로 설정합니다. 그렇지 않은 경우 development 또는 testing으로 설정이 됩니다.

## 5. Stale Data

- 데이터 리페칭 실행에는 만료된 데이터 외에도, 여러 트리거가 있습니다.
  - ex)컴포넌트가 다시 마운트 되거나, 윈도우가 다시 포커스 된 경우 등등
- 단, 만료된 데이터인 경우에만 리페칭이 실시됩니다.
- 데이터가 만료되었다고 판단하기 전까지 허용하는 시간이 staleTime입니다.

```js
const { data, isError, isLoading, error } = useQuery("post", fetchPosts, {
  staleTime: 2000,
});
```

### 5-2 stale Time vs cache Time

- staleTime 은 리패칭할 때의 고려사항
- 캐시는 나중에 다시 필요할 수도 있는 데이터용
  - 특정 쿼리에 대한 활성 useQuery가 없는 경우, 해당 데이터는 콜드 스토로지로 이동
  - 구성된 cacheTime이 지나면 캐시의 데이터가 만료되며, 유효시간의 기본값은 5분
  - cacheTime이 관찰하는 시간의 양은, 특정 쿼리에 대한 useQuery가 활성화된 후 경과한 시간
  - 페이지에 표시되는 컴포넌트가 특정 쿼리에 대해 useQuery를 사용한 시간을 의미
- 캐시가 만료되면 가비지 컬렉션이 실행되고, 클라이언트는 데이터를 사용할 수 없다.
- 데이터가 캐시되어 있는 동안에는 fetching할 때 사용을 할 수 있습니다.

## 6. 디테일 페이지의 코멘트가 바뀌지 않는 문제

### 이유

- 모든 쿼리가 comments쿼리키를 동일하게 사용을 하고 있기 때문.
- comments같이 알려진 쿼리 키가 있는 경우, 어떤 트리거가 있어야 데이터를 다시 가지고 오게 됩니다.
  - 컴포넌트를 다시 마운트, 윈도우를 다시 포커스
  - useQuery에서 반환되어 수동으로 리페칭을 실시할 때
  - 지정된 간격으로 리페칭을 자동실행할 때
  - 변이를 생성한 후 쿼리를 무효화 시킬시
  - 클라이언트 데이터가 서버의 데이터와 일치하지 않는 겨우

### 해결방안

- 새블로그 게시글 제목을 클릭할 때마다 데이터를 무효화시켜서 데이터를 다시 가져오기
  - 간단하지 않기에 권장하지 않음
- 데이터를 제거하면 안됨
  - 블로그 게시글 2의 댓글에 대한 쿼리를 만들 때, 캐시에서 블로그 게시글 1의 댓글을 제거하지 않아야함.
  - 같은 쿼리를 실행하는 것이 아니므로, 같은 캐시공간을 차지 하지 않기 때문
  - 엄밀히 말하면 블로그 게시물 1을 클릭했을 때, 블로그 게시물 1에 대한 캐시 데이터를 활용하는 것이 좋음
  - 블로그 게시글 2의 댓글로 덮어쓰는 것은 좋지 못함
- 쿼리는 게시물 id를 포함하기 때문에, 쿼리별로 캐시를 남길 수 있으며 comments 쿼리에 대한 캐시를 공유하지 않아도 괜찮음
- 각 쿼리에 해당하는 캐시를 가지게 될 것임
- **각 게시물에 대한 쿼리에 라벨을 설정**

#### 각 게시물에 대한 쿼리에 라벨을 설정하는 방법

- 쿼리 키에 문자열 대신 배열을 전달

```js
["comments", post.id];
```

위의 경우 쿼리키를 쿼리에 대한 의존성 배열로 취급하게 됩니다. 따라서 쿼리 키가 변경되면, 즉, post.id가 업데이트 되면 React Query가 새 쿼리를 생성해서 staleTime과 cacheTime을 가지게 되고, 의존성 배열이 다르다면 완전히 다른 것으로 간주되게 됩니다.
따라서 데이터를 가져올 때 사용하는 쿼리함수에 있는 값이 쿼리 키에 포함되어 있어야 한다. 이렇게 하면 모든 comments쿼리가 같은 쿼리로 간주되는 상황을 막고 각기 다른 쿼리로 다뤄지게 됩니다.

```js
//변경하기 전
const { data, isError, isLoading, error } = useQuery("comments", () =>
  fetchComments(post.id)
);

//변경 한 후
const { data, isError, isLoading, error } = useQuery(
  ["comments", post.id],
  () => fetchComments(post.id)
);
```

## 7. 페이지네이션

```js
export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);

  // 배열에 currentPage를 추가
  const { data, isError, isLoading, error } = useQuery(
    ["post", currentPage],
    () => fetchPosts(currentPage),
    {
      staleTime: 2000,
    }
  );

  return (
    <div className="pages">
      <button
        disabled={currentPage <= 1}
        onClick={() => {
          setCurrentPage((prev) => prev - 1);
        }}
      >
        Previous page
      </button>
      <span>Page {currentPage + 1}</span>
      <button
        disabled={currentPage >= maxPostPage}
        onClick={() => {
          setCurrentPage((prev) => prev + 1);
        }}
      >
        Next page
      </button>
    </div>
  );
}
```

위의 경우 다음 또는 이전 버튼을 클릭하는 경우 로딩으로 인해 사용자 경험을 떨어트리게 됩니다.

## 8. Prefeching

- 프리페칭이란 데이터를 캐시에 추가하며 구성할 수 있습니다. 기본값은 stale(만료)입니다.

```js
//1. useQueryClient를 가지고 옴
import { useQuery, useQueryClient } from "react-query";

async function fetchPosts(pageNum) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);

  //2. queryClient를 생성
  const queryClient = useQueryClient();

  //3. useEffect을 통해
  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["posts", nextPage], () =>
        fetchPosts(nextPage)
      );
    }
  }, [currentPage, queryClient]);

  //4. keepPreviousData: true, 추가
  const { data, isError, isLoading, error } = useQuery(
    ["post", currentPage],
    () => fetchPosts(currentPage),
    {
      staleTime: 2000,
      keepPreviousData: true,
    }
  );
  if (isLoading) return <h3>Loading</h3>;
  if (isError)
    return (
      <>
        <h3>Oops, Something is wrong</h3>
        <p>{error.toString()}</p>
      </>
    );

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
```

## 9. isFetching vs isLoading

### isFetching

- async 쿼리 함수가 해결되지 않았을 때 true, 아직 데이터를 가지고 오지 않은 상태

### isLoading

- isFetching이 참이면서, 쿼리에 대해 캐시된 데이터가 없는 상태를 뜻함

---

## 10. Mutations

- 서버에 데이터를 업데이트하도록 서버에 네트워크 호출을 실행
- 블로그의 포스트를 추가, 삭제, 변경
-
