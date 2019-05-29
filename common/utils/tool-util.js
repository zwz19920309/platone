const crypto = require('crypto')
const config = require('../../config/config')
const moment = require('moment')
const removeDuplication = (arr1, arr2) => {
  let c = []
  arr1.forEach((item) => {
    if (arr2.indexOf(item) === -1) c.push(item)
  })
  return c
}

const attributeCount = (obj) => {
  var count = 0
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      count++
    }
  }
  return count
}

const prefixImgUrl = (imgs) => {
  if (imgs instanceof Array) {
    imgs.forEach(img => {
      img.icon = config.base + '/' + img.icon
    })
  } else {
    imgs.icon = config.base + '/' + imgs.icon
  }
}

const getPrizeIndex = (dateType, startDate, number) => {
  let startAt
  let endAt
  let days
  let less
  switch (dateType) {
    case 2: // 周
      startAt = moment().startOf('week')
      startAt = moment(startAt).add(1, 'days').format('YYYY-MM-DD')
      endAt = moment().endOf('week')
      endAt = moment(endAt).add(1, 'days').format('YYYY-MM-DD')
      break
    case 3: // 月
      startAt = moment().startOf('month').format('YYYY-MM-DD')
      endAt = moment().endOf('month').format('YYYY-MM-DD')
      break
    case 4: // 年
      startAt = moment().startOf('year').format('YYYY-MM-DD')
      endAt = moment().endOf('year').format('YYYY-MM-DD')
      break
    case 5: // 自定义
      days = moment().diff(startDate, 'days')
      less = days % number
      startAt = moment().subtract(less, 'day').format('YYYY-MM-DD')
      endAt = moment().format('YYYY-MM-DD')
      break
  }
  return {
    startAt: startAt,
    endAt: endAt
  }
}

const randomString = (len) => {
  return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len)
}

const cryptoPassFunc = (password) => {
  const md5 = crypto.createHash('md5')
  return md5.update(password).digest('hex')
}

module.exports = {
  removeDuplication,
  attributeCount,
  prefixImgUrl,
  getPrizeIndex,
  randomString,
  cryptoPassFunc
}
