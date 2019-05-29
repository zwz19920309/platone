const path = require('path')

// 错误日志输出完整路径
let errorLogPath = path.resolve(__dirname, '../logs/error-')

// 响应日志输出完整路径
let responseLogPath = path.resolve(__dirname, '../logs/response-')

let infoLogPath = path.resolve(__dirname, '../logs/info-')

let logConfig = {
  'appenders': {
    'access': {
      'type': 'dateFile',
      'filename': responseLogPath,
      'pattern': '-yyyy-MM-dd'
    },
    'console': {
      'type': 'console'
    },
    'info': {
      'type': 'dateFile',
      'filename': infoLogPath,
      'encoding': 'utf-8',
      'maxLogSize': 10000000,
      'numBackups': 3,
      'pattern': 'yyyy-MM-dd.log',
      'alwaysIncludePattern': true
    },
    'error': {
      'type': 'dateFile',
      'filename': errorLogPath,
      'encoding': 'utf-8',
      'maxLogSize': 1000000,
      'numBackups': 3,
      'pattern': 'yyyy-MM-dd.log',
      'alwaysIncludePattern': true
    }
  },
  'categories': {
    'default': {
      'appenders': [
        'console',
        'info',
        'error'
      ],
      'level': 'debug'
    },
    info: {
      'appenders': [
        'info',
        'console'
      ],
      level: 'ALL'
    },
    console: {
      appenders: ['console'],
      level: 'ALL'
    },
    error: {
      appenders: ['error'],
      level: 'error'
    }

  }
}

module.exports = logConfig
