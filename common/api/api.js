const rp = require('request-promise')
const config = require('../../config/config')
const HttpResult = require('../../common/http/http-result')
const getUserInfoByToken = async (token) => {
  let res = await rp({
    methond: 'GET',
    uri: config.userApi.uri + '/getUserinfo/app',
    headers: {
      'x-version': config.userApi.apiVersion,
      'x-app-id': config.userApi.apiAppId
    },
    qs: {
      appId: config.userApi.appId,
      token: token
    },
    json: true
  })
  let user = (res.status === HttpResult.HttpStatus.SUCCESS) ? res.data : null
  return user
}

module.exports = {
  getUserInfoByToken
}
