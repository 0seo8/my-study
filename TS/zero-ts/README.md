# 타입스크립트 설치

## 프로젝트 별 구성

tsconfig.json 세팅

```shell
$ tsc --init
```

## 빌드

- 빌드와 컴파일은 구분해야합니다.

```shell
//01.js
$ tsc [변경하고 싶은 파일]
//01.d.ts
$ tsc [변경하고 싶은 파일] --declaration
```
