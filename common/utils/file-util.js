const path = require('path')
const config = require('../../config/config')
const moveFile = require('move-file')

const moveFileToTarget = async (files, fileName, hid) => {
  try {
    const file = files[fileName]
    const ext = path.extname(file.name)
    let filePath = `public/${hid}/${file.hash}${ext}`
    await moveFile.sync(file.path, `${config.staticPath}/${filePath}`)
    return filePath
  } catch (e) {
    throw e
  }
}

module.exports = {
  moveFileToTarget
}
