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

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

/** @type {Post[]} */
const posts = [
  {
    id: 'my_first_post',
    title: 'my First Post',
    content: 'Hello!',
  },
  {
    id: 'my_second_post',
    title: '두 번째 포스팅',
    content: 'Hi',
  },
]

/**
 * Post
 *
 * GET/posts
 *  - http localhost:4000
 * GET/posts/:id
 *  - http localhost:4000/posts/1
 * POST /posts
 *  - http POST localhost:4000/posts title=foo cotent=bar
 *  - http POST localhost:4000/posts title=foo cotent=bar --print=hHbB
 *  - 보낸것과 받은것 모두 표시: hHnB / hb(응답) /HB(요청)
 */

const server = http.createServer((req, res) => {
  const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/
  const postIdRegexResult =
    (req.url && POSTS_ID_REGEX.exec(req.url)) || undefined

  if (req.url === '/' && req.method === 'GET') {
    const result = {
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
      })),
      totalCount: posts.length,
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json; encoding=utf-8')
    res.end(JSON.stringify(result))
  } else if (postIdRegexResult && req.method === 'GET') {
    // GET /posts/:id
    const postId = postIdRegexResult[1]
    const post = posts.find((_post) => _post.id === postId)

    if (post) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json; encoding=utf-8')
      res.end(JSON.stringify(post))
    } else {
      res.statusCode = 404
      res.end('Post not found')
    }
  } else if (req.url === '/posts' && req.method === 'POST') {
    req.setEncoding('utf-8')
    req.on('data', (data) => {
      /**
       * @typedef CreatePostBody
       * @property {string} title
       * @property {string} content
       */

      /** @type {CreatePostBody} */
      const body = JSON.parse(data)
      posts.push({
        id: body.title.toLowerCase().replace(/\s/g, ''),
        title: body.title,
        content: body.content,
      })
    })

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

//
