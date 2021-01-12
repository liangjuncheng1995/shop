import {
  Http
} from '../utils/http.js'

class Banner {
  static LocationB = 'b-1'
  static LocationG = 'b-2'
  static async getHomeLocationB() {
    return await Http.request({
      url: `/banner/name/${Banner.LocationB}`
    })
  }

  static async getHomeLocationG() {
    return await Http.request({
      url: `/banner/name/${Banner.LocationG}`
    })
  }
}

export {
  Banner
}