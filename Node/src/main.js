// @ts-check

/**
 * 블로그 포스팅 서비스
 * - 로컬 파일을 데이터베이스로 활용(JSON)
 * - 인증 로직은 넣지 않음
 * - Restful API를 사용
 */

const http = require('http')

/**
 * Post
 *
 * GET/posts
 * GET/posts/:id
 * POST /posts
 */

const server = http.createServer((req, res) => {
  const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/
  const postIdRegexResult =
    (req.url && POSTS_ID_REGEX.exec(req.url)) || undefined

  if (req.url === '/' && req.method === 'GET') {
    res.statusCode = 200
    res.end('List of posts')
  } else if (postIdRegexResult) {
    //GET /posts/:id
    const postId = postIdRegexResult[1]
    console.log(postId)
    res.statusCode = 200
    res.end('Some content of the post')
  } else if (req.url === 'posts' && req.method === 'POST') {
    res.statusCode = 200
    res.end('Creating post')
  } else {
    res.statusCode = 404
    res.end('NOT FOUND')
  }
})

const PORT = 4000

server.listen(PORT, () => {
  console.log(`The server is listening at port: ${PORT}`)
})
