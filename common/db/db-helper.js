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
  static async getPlatFormList() {
    let [rows] = await DataDb.query('SELECT * FROM platform')
    return rows
  }
  static async addPlatForm(params) {
    let [rows] = await DataDb.query('INSERT INTO platform SET ?', [{ name: params.name, pips: params.pips, foreign_currency: params.foreign_currency, lows_level: params.lows_level, lerver_level: params.lerver_level, supervise_level: params.supervise_level, stars: params.stars }])
    return rows
  }
  static async blukAddPlatForm(params) {
    let [rows] = await DataDb.query('INSERT INTO platform (name, pips, foreign_currency, lows_level, lerver_level, supervise_level, stars) VALUES', [params])
    return rows
  }
}

module.exports = DBHelper
