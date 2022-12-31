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

## 3. React Qeury Dev Tools

### 3-1 React Qeury Dev Tools란?

- 쿼리 키로 쿼리를 표시해 주며, active, inactive, stale 등 모든 쿼리의 상태를 알려줍니다.
- 마지막으로 업데이트된 타임스탬프도 알려줍니다.
- 쿼리에 의해 반환된 데이터를 확인할 수 있는 데이터 탐색기도 있습니다.
- 쿼리를 볼 수 있는 쿼리 탐색기도 있습니다.
- https://react-query.tanstack.com/devtools

### 3-2 주의점

- 기본적으로 dev tools는 프로덕션 번들에 포함되어 있지 않습니다.
- NODE_ENV변수에 따라 프로덕션 환경에 있는지 여부가 결정됩니다.
- Create React 엡은 npm run build를 실행할 때만 NODE_ENV변수를 production으로 설정합니다. 그렇지 않은 경우 development 또는 testing으로 설정이 됩니다.
-