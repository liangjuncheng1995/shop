// pages/home/home.js
import {
  config
} from '../../config/config.js'
import {
  Theme
} from '../../models/theme.js'
import {
  Banner
} from '../../models/banner.js'
import {
  Category
} from '../../models/category.js'
import {
  Activity
} from '../../models/activity.js'
import {
  SpuPaging
} from '../../models/spu-paging.js'

Page({


  data: {
    themeA: null,
    bannerB: null,
    grid: [],
    activityD: null,
    themeE: null,
    themeESpu: [],
    spuPaging: null,
    loadingType: "loading",
  },

  async onLoad(options) {
    // Theme.getHomeLocationA(data => {
    //   this.setData({
    //     topTheme: data[0]
    //   })
    // })
    // Theme.getHomeLocationA()
    //开启头部主题的数据
    // this.initAllData()
    // 开底部瀑布流的数据
    this.initBottomSpuList()
  },

  async initBottomSpuList() {
    const paging = SpuPaging.getLatestPaging()
    this.data.spuPaging = paging
    const data = await paging.getMoreData()
    if (!data) {
      return
    }
    wx.lin.renderWaterFlow(data.items)
  },

  async initAllData() {
    // const themes = await Theme.getThemes()
    // let a = new Theme()
    // a.b = 1
    // let c = new Theme()
    // c.b = 2
    // console.log(c)
    // let e = new Theme()
    // console.log(Theme.a)

    //循环的操作
    // for(let i in themes) {
    //   console.log(themes[i])
    //   if (themes[i].name == "t-1") {
    //     var themeA = themes[i]
    //     break;
    //   }
    // }
    // 集合的操作(优先)
    // find filter map some reduce

    //保存数据状态
    // 1.缓存
    // 2.全局变量 app.js
    // 3. 类的对象，本身就具有保存数据的功能，
    // 类可以保存数据，不能保存状态，类的对象却可以

    //写数据接口的时候的原则，调用方需要简单，被调用方逻辑可以写复杂

    const theme = new Theme() //实例化
    await theme.getThemes() //请求所有主题的接口
    const themeA = theme.getHomeLocationA() //获取主题A的数据
    const themeE = theme.getHomeLocationE() //获取主题E的数据
    let themeESpu = []
    if (themeE.online) { //是否上线
      const themeESpuList = await Theme.getHomeLocationESpu() //获取每周上新的数据列表
      if (themeESpuList) {
        themeESpu = themeESpuList.spu_list.slice(0, 8)
      }
    }
    const themeF = theme.getHomeLocationF() //获取主题F的数据

    const bannerB = await Banner.getHomeLocationB()
    const grid = await Category.getHomeLocationC()
    const activityD = await Activity.getHomeLocationD()

    const bannerG = await Banner.getHomeLocationG()

    const themeH = theme.getHomeLocationH() //获取主题H的数据




    this.setData({
      themeA,
      themeE,
      themeESpu,
      themeF,
      themeH,
      bannerB,
      grid,
      activityD,
      bannerG
    })
  },

  async onReachBottom() {
    const data = await this.data.spuPaging.getMoreData()
    if (!data) {
      return
    }
    wx.lin.renderWaterFlow(data.items)
    if(!data.moreData) {
      this.setData({
        loadingType: 'end'
      })
    }
  },


  onShareAppMessage: function() {

  }
})