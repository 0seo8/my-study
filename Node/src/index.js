// @ts-check
// Formatting, Linting
// Formatting: Prettier
// Lintint: Eslint

/* eslint-disable-next-line */
console.log('Hello, world!')

const http = require('http')

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.end('Hello')
})

const PORT = 4000
server.listen(PORT, () => {
  console.log(`The server is listening at port: ${PORT}`)
})
