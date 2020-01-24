import {Http} from "../utils/http.js"
class Spu {

  static isNoSpec(spu) {//判断是否有规格数据
    if(spu.sku_list.length === 1 && spu.sku_list[0].specs.length === 0) {//没有规格的数据
      return true
    }
    return false
  }

  static getDetail(id) {
    return Http.request({
      url: `spu/id/${id}/detail`
    })
  }
}

export {
  Spu
}