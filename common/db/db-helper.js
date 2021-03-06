require('./env')
const mysql = require('mysql2/promise')

const DataDb = mysql.createPool({
  host: process.env['SIGN_IP'],
  user: process.env['SIGN_USER'],
  password: process.env['SIGN_PASS'],
  database: process.env['SIGN_DATABASE'],
  dateStrings: true
})
class DBHelper {
  static async getPlatFormList(params) {
    let [rows] = await DataDb.query('SELECT * FROM platform  where remove = 0 limit ? , ?', [(params.page - 1) * params.pageSize, params.pageSize])
    let [total] = await DataDb.query('SELECT count(1) as total FROM platform where remove = 0')
    return { rows: rows, total: total[0].total }
  }
  static async addPlatForm(params) {
    let [rows] = await DataDb.query('INSERT INTO platform SET ?', [{ name: params.name, pips: params.pips, foreign_currency: params.foreign_currency, range_level: params.range_level, lows_level: params.lows_level, lever_level: params.lever_level, supervise_level: params.supervise_level, stars: params.stars, cont: params.cont, icon: params.icon }])
    return rows
  }
  static async updatePlatForm(params) {
    let [rows] = await DataDb.query('UPDATE platform SET ? WHERE id = ?', [{ name: params.name, pips: params.pips, foreign_currency: params.foreign_currency, range_level: params.range_level, lows_level: params.lows_level, lever_level: params.lever_level, supervise_level: params.supervise_level, stars: params.stars, cont: params.cont }, params.id])
    return rows
  }
  static async findOnePlatForm(params) {
    let [rows] = await DataDb.query('SELECT * from platform WHERE id = ?', [params.id])
    let res = rows.length ? rows[0] : null
    return res
  }
  static async bulkAddPlatForm(params) {
    let [rows] = await DataDb.query('INSERT INTO platform (name, pips, foreign_currency, range_level, lows_level, lever_level, supervise_level, stars, cont) VALUES ?', [params])
    return rows
  }
  static async bulkDeletePlatForm(params) {
    let [rows] = await DataDb.query('UPDATE platform SET remove = 1 WHERE id in (?)', [params.ids])
    return rows
  }

  static async searchPlatFormByName(params) {
    let [rows] = await DataDb.query('SELECT * from platform WHERE remove = 0 and name like ? limit ?, ? ', [('%' + params.name + '%'), (params.page - 1) * params.pageSize, params.pageSize])
    let [total] = await DataDb.query('SELECT count(1) as total FROM platform WHERE  remove = 0 and name like ? ', [('%' + params.name + '%')])
    return { rows: rows, total: total[0].total }
  }
}

module.exports = DBHelper
