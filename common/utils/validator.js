module.exports = {
  isNum: (num) => {
    return (typeof parseInt(num) === 'number' && !isNaN(num) && num >= 0)
  },
  isLevel: (num) => {
    return (typeof parseInt(num) === 'number' && !isNaN(num) && num >= 0 && num <= 5)
  }
}
