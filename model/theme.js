// 业务对象
// 前端 重 精力时间
// theme banner spu sku address user

import {
  Http
} from '../utils/http.js'

class Theme {
  static locationA = 't-1'
  static locationE = 't-2'
  static locationF = 't-3'
  static locationH = 't-4'

  themes = []
 
  async getThemes() { //加不加static 在调用方home.js 里，是用实例化去调用，还是用类去调用，这里是用实例化去调用（下面加了static就是用类去调用，不用实例化---使用类去调用方法，还是实例化去调用方法，取决于你的数据是否需要通过类的对象去保存，还是不要保存，说白了，就是需要保存数据的时候，不使用static,用实例化去调用。不需要保存数据的时候就要去使用static了，使用类直接去调用）
    const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
    this.themes = await Http.request({
      url: `/theme/by/names`,
      data: {
        names
      }
    })
  }

  getHomeLocationA() {
    return this.themes.find(t => t.name == Theme.locationA)
  }
  getHomeLocationE() {
    return  this.themes.find(t => t.name == Theme.locationE)
  }
  getHomeLocationF() {
    return this.themes.find(t => t.name == Theme.locationF)
  }
  getHomeLocationH() {
    return this.themes.find(t => t.name == Theme.locationH)
  }

  static async getHomeLocationESpu() {
    return Theme.getThemeSpuByName(Theme.locationE)
  } 
  static async getThemeSpuByName(name) {
    return await Http.request({
      url: `theme/name/${name}/with_spu`
    })
  }

  

  // 使用实例去调用，还是用类去调用
  // 需要等待的时候，加上await

  // static async getHomeLocationE() {
  //   return await Http.request({
  //     url: '/theme/by/names',
  //     data: {
  //       names: Theme.locationA
  //     },
  //     method: "GET",
  //   })
  // }

  // 每一个发送一个http的请求，
  // Home 页面只发送一个http
  // 部分http请求合并成一个

  // 1.http请求数量
  // 2.http多少次数据库查询 join
  // 3.接口灵活性，接口的可维护性 （粒度）（推荐）

  // Web IO IO密集型 CPU密集型

}

export {
  Theme
}