# Blog-em Ipsum

- Jsonplaceholder를 이용
- React Qeury concepts
  - Fetching Data
  - Loading / errror states
  - React Query dev tools
  - Pagination
  - Prefeching
  - Mutations

## isFetching vs isLoading

isFetching

- 비동기 쿼리가 해결되지 않았다.
- Axios 호출 또는 GraphQL 호출 일 수도 있음
  isLoading
- isFetching의 하위 집합
- 가져오는 상태에 있는 것을 의미
- 쿼리함수가 아직 해결되지 않았으며 캐시된 데이터도 없음
- 즉, 데이터를 가져오는 중이며 표시할 캐시도 없다.
