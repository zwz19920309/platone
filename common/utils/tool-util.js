
const config = require('../../config/config')
const prefixImgUrl = (imgs) => {
  if (imgs instanceof Array) {
    imgs.forEach(img => {
      img.icon = config.base + '/' + img.icon
    })
  } else {
    imgs.icon = config.base + '/' + imgs.icon
  }
}

module.exports = {
  prefixImgUrl
}
