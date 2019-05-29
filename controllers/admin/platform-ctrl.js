const HttpResult = require('../../common/http/http-result')
const platformService = require('../../services/admin/platform-service')

// 获取平台列表
const getPlatFormList = async (ctx) => {
  let platformList = await platformService.getPlatFormList()
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: platformList }, 'SUCCESS')
}

// 获取平台列表
const addPlatForm = async (ctx) => {
  let { name } = ctx.request.body
  if (!name) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '参数缺失'))
  }
  let result = await platformService.addPlatForm({ name: name })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, result, 'SUCCESS')
}
// 修改场景
const updatePlatForm = async (ctx) => {
  let { name, id } = ctx.request.body
  if (!id) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '参数id缺失'))
  }
  let platForm = await platformService.findOnePlatForm({ id: id })
  let result = await platformService.updatePlatForm({ name: name || platForm.name, id: id })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, result, 'SUCCESS')
}

// 删除场景
const bulkAddPlatForm = async (ctx) => {
  let files = ctx.request.files
  console.log('@files----', files)
  // let plateForm = await platformService.bulkDeletePlatForm({ ids: ids })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, [], 'SUCCESS')
}

module.exports = {
  getPlatFormList,
  addPlatForm,
  updatePlatForm,
  bulkAddPlatForm
}
