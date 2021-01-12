import {
  Http
} from '../utils/http.js'
import {
  Paging
} from '../utils/paging.js'
class SpuPaging {
  static getLatestPaging() {
    return new Paging({
      url: `/spu/latest`,
    }, 5)
    // Http.request(``)
  }

  static getHotPaging() {
    return new Paging({
      // url: `/spu/hotLatest`
      url: `/spu/latest`
    }, 5);
  }
  // 1. 数据为空的情况，
  // 2.最后一页，还有没有更多的数据
  // 3.累加  setData 重新渲染页面 1-20 1-40 1-60
  // 4.分页数据加载状态： 正在加载，加载完成，没有更多数据了
  // 上滑页面触底加载，避免用户重复发请求，数据锁
  // 按钮的点击操作 防抖，节流 需要有禁用的状态，倒计时， 模态loading
  // 类 函数

}
export {
  SpuPaging
}