서버상태를 가져오고 캐싱하고 동기화하고 업데이트 합니다.

리액트의 경우 서버로부터 데이터를 가져오거나 업데이트하는 방법을 제공하지 않습니다. 따라서 개발자는 자체적으로 방법을 구축해야합니다.

일반적으로는 react hooks를 사용해 component state와 effect를 조합해서 mobx나 redux와 같이 상태머신을 사용해 리액트 전체의 비동기 처리를 다룹니다.

대부분의 전통적인 상태관리 라이브러리는 비동기처리나 서버 상태보다는 크라이언트에 적합합니다.

---

## 포켓몬 도감

```shell
$ npm i @emotion/react @emotion/styled axios react-query reset-css react-router-dom
```

```shell
$  npm i @types/react-router-dom -D
```
