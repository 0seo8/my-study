# 생활코딩 도커

## Intro

내 컴퓨터에서 어떤 어플리케이션을 만들기 위해서는 운영체제의 여러 소프트웨어를 다운 받아야합니다.
(ex) 웹서버, 데이터베이스 등등)

하나의 컴퓨터에 가상으로 컴퓨터를 만들고 그 위에 운영체제를 설치한 후에 거기에 웹 서버를 설치한다면, 컴퓨터를 별도로 장만하지 않아도 됩니다.

하지만 겨우 웹서버를 운영하기 위해서 운영체제를 깔아야한다는 것이 너무 아깝습니다.

하나의 컴퓨터 안에서 각각의 앱을 실행(MY APP, WEB SERVER, DATABASE 등)을 실행시키고, 각각의 앱은 격리된 환경에서 실행된다면 어떨까요?

운영체제가 설치된 컴퓨터를 host라고 할 때 , 호스트에 설치된 각각의 실행환경을 컨테이너라고 부릅니다.

각각의 컨테이너에는 운영체제 전체가 설치된 것이 아니라, 앱을 실행하는데 필요한 라이브러리와 실행파일들만 설치되어 있습니다.

이 경우, 이미 존재하는 운영체제를 공유하기 떄문에 무엇을 설치할 필요도 없으며 운영체제가 하나이기때문에 속도도 느려지지 않습니다. 저장장치의 용량도 아낄수 있습니다.

리눅스 운영체제에는 이런 환상적인 앱 실행방법이 내장되어 있습니다. 이런한 기술을 컨테이너라고 부릅니다.

컨테이너를 이용해서 이런 일을 쉽게 해주는 소프트웨어 중 가장 잘 나가는 제품이 도커입니다.

## Install

도커와 같은 컨테이너 기술은 리눅스 운영체제 기술입니다. 즉, 도커 위에서 돌아가는 컨테이너, 그리고 그 컨테이너 안에서 동작하는 각각가의 앱들은 리눅스 운영체제 안에서 동작하는 앱들입니다.

운영체제가 리눅스나, 맥os라면 가상머신을 깔고 그 가상머신에 리눅스 운영체제를 깔면 리눅스 운영체제 안에서 도커와 같은 컨테이너 기술을 사용할 수 있어집니다.

## 이미지 pull

![](https://velog.velcdn.com/images/0seo8/post/99948b95-f47a-48bd-9b2a-2f41ddd3d77f/image.png)

`docker hub(마치 app store)`에서 다운로드 해서 우리 컴퓨터에 가지고 있는 것을 `image(마치 program)`, 이미지를 실행하는 것을 `container(마치 process)`라고 합니다.

또한 `docker hub`에서 이미지를 다운 받는 행위를 **pull**, 그리고 다운 받아 실행시키는 행위를 **run**이라고 합니다.

### 1. 이미지 pull 하는 방법

[docker hub](!https://hub.docker.com/)에서 Explore 탭- containers에 접속합니다.

ex) 아파치 웹서버 프로그램을 컨테이너 위에서 실행시키고 싶은 경우

```shell
//설치
$ docker pull httpd

//확인
$ docker images
```

## 이미지 run

### 1. docker desktop

- images - 선택 - run
- **이미지를 컨테이너로 만들 때 여러개의 컨테이너가 생기기 때문에 이름을 잘 지정해야합니다.**
- 컨테이너를 중단하고 싶은 경우 `stop`버튼을, 삭제하고 싶은 경우 `DELETE`버튼을 누르면 됩니다.

### 2. CLI

```shell
$ dcoker run [OPTINS] IMAGE [COMMAND] [ARG...]
```

```shell
//컨테이너 생성
$ docker run httpd

//컨테이너 보기
$ docker ps

//또다른 컨테이너 생성
$ docker run --name ws2 httpd

//끄기
$ docker stop ws2

//실행을 중지한 컨테이너까지 보기
$ docker ps -a

//중지된 컨테이너 재실행
$ docker run ws2

//로그 확인(단, 출력후 꺼짐)
$ docker logs ws2

// 로그 실시간 확인
$ docker logs -f ws2

//컨테이너 삭제(단, 실행중인 컨테이너를 지울수는 없음)
$ docker rm ws2

//실행중인 컨테이너 삭제
$ docker rm --force ws2

//이미지 삭제
$ docker rmi httpd
```

## 네트워크

```shell
//실행중인 컨테이너 확인
$ docker ps

// ws3이름을 생성, 8081포트를 컨테이너 80포트와 연결
$ docker run --name ws3 -p 8081:80 httpd
```

`http://localhost:8081/index.html`에 접속하여 확인

![](https://velog.velcdn.com/images/0seo8/post/14770927-c82c-407e-8999-6a112a060ea7/image.png)

## 명령어 실행
