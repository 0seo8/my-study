FROM node:16.14.2

WORKDIR /usr/src/app

# 패키지와 관련된 모든 정보를 가지고 와 복사 붙여넣기를 할 것이다.
COPY package*.json ./

RUN npm install

# 모든 파일들을 복사 붙여넣기
COPY . . 

# index.js에서 작성한 PORT를 외부에 노출시켜줌
EXPOSE 8080

# node를 사용해 index.js를 실행시킬 것이다.
CMD ["node", "index.js"]

