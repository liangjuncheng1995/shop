// 业务对象
// 前端 重 精力时间
// theme banner spu sku address user

import {
  Http
} from '../utils/http.js'

class Theme {
  static async getHomeLocationA() {
    return await Http.request({
      url: '/theme/by/names',
      data: {
        names: "t-1"
      },
      method: "GET",
    })
  }
}

export {
  Theme
}