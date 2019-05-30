const xlsx = require('node-xlsx')
const HttpResult = require('../../common/http/http-result')
const validator = require('../../common/utils/validator')
const platformService = require('../../services/admin/platform-service')

// 获取平台列表
const getPlatFormList = async (ctx) => {
  let { page, size } = ctx.request.body
  let { rows, total } = await platformService.getPlatFormList({ page: page || 1, pageSize: size || 10 })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, { list: rows, total: total }, 'SUCCESS')
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
  let { name, pips, currency, lows, lever, supervise, id } = ctx.request.body
  if (!id) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '参数id缺失'))
  }
  if (!validator.isLevel(pips) || !validator.isLevel(currency) || !validator.isLevel(lows) || !validator.isLevel(lever) || !validator.isLevel(supervise)) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '参数不合法'))
  }
  let platForm = await platformService.findOnePlatForm({ id: id })
  let [cname, cpips, ccurrency, clows, clever, csupervise] = [
    name || platForm.name,
    pips || platForm.pips,
    currency || platForm.foreign_currency,
    lows || platForm.lows_level,
    lever || platForm.lever_level,
    supervise || platForm.supervise_level
  ]
  let cstars = (((parseFloat(cpips) + parseFloat(currency) + parseFloat(clows) + parseFloat(csupervise) + parseFloat(clever)) / 5) * 2).toFixed(2)
  let result = await platformService.updatePlatForm({
    name: cname,
    pips: cpips,
    foreign_currency: ccurrency,
    lows_level: clows,
    lever_level: clever,
    supervise_level: csupervise,
    stars: cstars,
    id: id
  })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, result, 'SUCCESS')
}

// 上传excel添加记录
const bulkAddPlatForm = async (ctx) => {
  let files = ctx.request.files
  if (!files['platform']) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, 'excel文件缺失'))
  }
  let excelName = '最终版'
  let platFormList = []
  let workSheetsFromBuffer = xlsx.parse(files['platform']['path'])
  workSheetsFromBuffer.forEach(sheet => {
    if (sheet.name === excelName) {
      platFormList = sheet.data
    }
  })
  if (!(platFormList && platFormList.length)) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, 'excel文件内数据缺失'))
  }
  let eles = [{ key: 'name', name: '名称', index: 0 }, { key: 'pips', name: '点差星级' }, { key: 'foreign_currency', name: '外汇品种星级' }, { key: 'lows_level', name: '最低入金星级' }, { key: 'lever_level', name: '杠杆数星级' }, { key: 'supervise_level', name: '监管数星级' }, { key: 'stars', name: '总星级' }]
  let arrs = platformService.filterPlatForms(platFormList, eles)
  let datas = []
  arrs.forEach(ele => {
    datas.push([ele['name'], ele['pips'], ele['foreign_currency'], ele['lows_level'], ele['lever_level'], ele['supervise_level'], ele['stars']])
  })
  let result = await platformService.bulkAddPlatForm(datas)
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, result, 'SUCCESS')
}

// 批量删除平台
const bulkDeletePlatForm = async (ctx) => {
  let { ids } = ctx.request.body
  if (!(ids && ids.length)) {
    return (ctx.body = HttpResult.response(HttpResult.HttpStatus.ERROR_PARAMS, null, '参数缺失'))
  }
  let result = await platformService.bulkDeletePlatForm({ ids: ids })
  ctx.body = HttpResult.response(HttpResult.HttpStatus.SUCCESS, result, 'SUCCESS')
}

module.exports = {
  getPlatFormList,
  addPlatForm,
  updatePlatForm,
  bulkAddPlatForm,
  bulkDeletePlatForm
}
