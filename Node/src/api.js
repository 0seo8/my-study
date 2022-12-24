// @ts-check

/**
 * 리팩토링
 * 1. 로직을 묶는 다는 것은 추상화를 한다는 것이고, 추상화를 한다는 것은 공통되는 로직을 꺼내서 그 규격에 맞게 코드를 재구축하는 것.
 *   - statusCode를 받는 부분, header를 정하고, http body 를 쓰는 부분
 *   - 따라서 이런 부분을 미리 잘 추상화해서 함수꼴로 묶어두거나, 타입 체크를 하도록 잘 막아줘야 함.
 */

/**
 * @typedef APIResponse
 * @property {number} statusCode
 * @property {*} body
 */

/**
 * @typedef Route
 * @property {RegExp} url
 * @property {'GET' | 'POST'} method
 * @property {() => Promise<APIResponse>} callback
 */

/** @type {Route[]} */
const routes = [
  {
    url: /^\/posts$/,
    method: 'GET',
    callback: async () => ({
      statusCode: 200,
      body: {},
    }),
  },
  {
    url: /^\/posts\/([a-zA-Z0-9-_]+)$/, // TODO: RegExp고쳐야 함.
    method: 'GET',
    callback: async () => ({
      // TODO: implement
      statusCode: 200,
      body: {},
    }),
  },
  {
    url: /^\/posts$/,
    method: 'POST',
    callback: async () => ({
      // TODO: implement
      statusCode: 200,
      body: {},
    }),
  },
]

module.exports = {
  routes,
}
