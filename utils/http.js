import {
  config
} from '../config/config.js'
import {
  promisic
} from './utils.js'

class Http {
  static async request({
    url,
    data,
    method = "GET"
  }) {
    const res = await promisic(wx.request) ({
      url: `${config.apiBaseUrl}${url}`,
      data,
      method,
      header: {
        "appkey": config.appkey
      },
    })
    return res.data
  }
}

// 动态语言里（js,python），将一个函数当做参数传入另一个函数里面是常见的

// callback
// promise
// async await
// 使用 await 要有返回的结果 

export {
  Http
}