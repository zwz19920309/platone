const HttpResult = require('../../common/http/http-result')
const sceneService = require('../../services/admin/scene-service')
// 校验权限 哪里需要加上校验就加上此中间件
const verify = async (ctx, next) => {
  let { uid, appid, appsecret } = ctx.request.body
  if (!uid || !appid || !appsecret) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '参数缺失'))
  }
  let scene = await sceneService.findOneSceneByAppId({ app_id: appid, app_secret: appsecret })
  if (!scene) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, 'appid, appsecret不合法'))
  }
  ctx.request.body.sceneid = scene.id
  return next()
}

module.exports = {
  verify
}
