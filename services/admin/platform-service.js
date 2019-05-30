const DBHelper = require('../../common/db/db-helper')
/**
  * 获取平台列表
  * @method getPlatFormList
  * @param  {object} params - 参数
  * @return {object}
 */
const getPlatFormList = async (params) => {
  let platFormList = await DBHelper.getPlatFormList(params)
  return platFormList
}
/**
  * 增加平台
  * @method addPrize
  * @param  {object} params 参数
  * @return {object} 增加结果
 */
const addPlatForm = async (params) => {
  let result = await DBHelper.addPlatForm(params)
  return result
}
/**
  * 修改平台
  * @method addPrize
  * @param  {object} params 参数
  * @return {object} 修改结果
 */
const updatePlatForm = async (params) => {
  let result = await DBHelper.updatePlatForm(params)
  return result
}
/**
  * 查询唯一平台
  * @method addPrize
  * @param  {object} params 参数
  * @return {object} 修改结果
 */
const findOnePlatForm = async (params) => {
  let result = await DBHelper.findOnePlatForm(params)
  return result
}
/**
  * 批量添加平台
  * @method addScene
  * @param  {object} params -平台参数
  * @return {object} 添加结果
 */
const bulkAddPlatForm = async (params) => {
  let result = await DBHelper.bulkAddPlatForm(params)
  return result
}

/**
  * 批量删除平台
  * @method addScene
  * @param  {object} params -平台参数
  * @return {object} 添加结果
 */
const bulkDeletePlatForm = async (params) => {
  let result = await DBHelper.bulkDeletePlatForm(params)
  return result
}

/**
  * 过滤平台数据
  * @method filterPlatForms
  * @param  {Array} platFormList 平台数据列表
  * @param {Array} rows 行元素列表
  * @return {Array} arrs 过滤后的平台数据列表
 */
const filterPlatForms = (platFormList, rows) => {
  platFormList[0].forEach((name, index) => {
    rows.forEach(ele => {
      if (ele.name === name) {
        ele.index = index
      }
    })
  })
  platFormList.shift()
  let arrs = []
  platFormList.forEach(platform => {
    let data = {}
    rows.forEach(ele => {
      data[ele.key] = platform[ele.index]
    })
    arrs.push(data)
  })
  return arrs
}

module.exports = {
  getPlatFormList,
  addPlatForm,
  updatePlatForm,
  findOnePlatForm,
  bulkAddPlatForm,
  bulkDeletePlatForm,
  filterPlatForms
}
