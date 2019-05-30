
const validator = {
  isNum: (num) => {
    return (typeof parseInt(num) === 'number' && !isNaN(num) && num >= 0)
  }
}

module.exports = {
  validator
}
