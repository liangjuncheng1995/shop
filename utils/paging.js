import {Http} from './http.js'

class Paging {
  // 需要保存对象，需要实例化
  start
  count
  req
  locker //锁
  url
  moreData = true

  accumulator = []
  constructor(req, count = 10, start = 0) {
    this.start = start
    this.count = count
    this.req = req
    this.url = req.url
  }
  async getMoreData() {
    if(!this.moreData) {
      return
    }
    //生成器 Generator
    // getlocker
    if(!this._getLocker()) {
      return
    }
    const data = await this._actualGetData()
    this._releaseLocker()
    return data
  }



  async _actualGetData() {
    const req = this._getCurrentReq()
    let paging = await Http.request(req)
    if(!paging) {
      return null
    }
    if(paging.total === 0) {
      return {
        empty: true,
        items: [],
        moreData: false,
        accumulator: []
      }
    }
    this.moreData = Paging._moreData(paging.total_page,paging.page)
    if(this.moreData) {
      this.start += this.count
    }
    this._accumulate(paging.items)

    // 组装数据结构的返回 
    return {
      empty: false,
      items: paging.items,
      moreData: this.moreData,
      accumulator: this.accumulator
    }
    // 数据结构
  }
  _accumulate(items) {
    this.accumulator = this.accumulator.concat(items)
  }

  static _moreData(totalPage, pageNum) {
    return pageNum < totalPage - 1
  }

  _getCurrentReq() {//组装请求的对象
    let url = this.url
    const params = `start=${this.start}&count=${this.count}`
    if(url.includes('?')) {
      url += '&' + params
    } else {
      url += '?' + params
    }
    this.req.url = url
    return this.req
    //值类型 和 引用类型
  }

  _getLocker() {
    if(this.locker) {
      return false
    }
    this.locker = true
    return true
  }
  _releaseLocker() {
    this.locker = false
  }
}

export {
  Paging
}