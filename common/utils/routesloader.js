const glob = require('glob')

module.exports = dirname => {
  return new Promise((resolve, reject) => {
    const routers = []
    glob(`${dirname}/*.js`, { ignore: '**/index.js' }, (err, files) => {
      if (err) {
        reject(err)
      }
      files.forEach(file => {
        const router = require(file)
        routers.push(router)
      })
      resolve(routers)
    })
  })
}
