# Infinite SWAPI

## useInfiniteQuery이 useQuery와 다른점

- 반환된 데이터 프로퍼티의 형태가 다름
  - useQuery의 경우 데이터는 단순히 쿼리 함수에서 반환되는 데이터
  - useInfiniteQuery에서 객체는 두개의 프로퍼티를 가지고 있음
    - pages
    - pageParams
  - 모든 쿼리는 페이지 배열에 고유한 요소를 가지고 있고, 그 요소는 해당 쿼리에 대한 데이터에 해당됨, 페이지가 진행되면서 쿼리도 바뀜
  - pageParmas은 검색된 쿼리의 키를 추적
    - pagesParmas는 흔히 사용되지는 않음
- 구문역시 다름
  - pageParam은 쿼리 함수에 전달되는 매개변수
  ```js
  useInfiniteQuery("sw-people", ({ pageParma = defaultUrl }) =>
    fetchUrl(pageParam)
  );
  ```
  - React Query가 pageParam의 현재 값을 유지
  - useInfiniteQuery options
    - getNextPageParam: (lastPage, allPages)
  - pageParam을 업데이트해줌

## uesInfiniteQuery Return Object Properties

- fetchNextPage
- hasNestPage
- isFetchingNextPage
