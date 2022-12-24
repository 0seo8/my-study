// @ts-check

/**
 * 블로그 포스팅 서비스
 * - 로컬 파일을 데이터베이스로 활용(JSON)
 * - 인증 로직은 넣지 않음
 * - Restful API를 사용
 * - JSDoc을 이용한 타입지정
 *  - 타입스크립트가 자동으로 JSDoc을 파싱하여 타입을 만들어줍니다.
 */

const http = require('http')
const { routes } = require('./api')

const server = http.createServer((req, res) => {
  async function main() {
    const route = routes.find(
      (_route) =>
        req.url &&
        req.method &&
        _route.url.test(req.url) &&
        _route.method === req.method
    )

    if (!route) {
      res.statusCode = 400
      res.end('Nod found')
      return
    }

    const result = await route.callback()
    res.statusCode = result.statusCode

    if (typeof result.body === 'string') {
      res.end(result.body)
    } else {
      res.setHeader('Content-Type', 'application/json charset=utf-8')
      res.end(JSON.stringify(result.body))
    }

    res.end(result.body)
  }

  main()
})

const PORT = 4000

server.listen(PORT, () => {
  console.log(`The server is listening at port: ${PORT}`)
})

//
