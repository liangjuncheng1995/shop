// pages/detail/detail.js
import {
  Spu
} from '../../models/spu.js'
import {
  ShoppingWay
} from '../../core/enum.js'
import {
  SaleExplain
} from '../../models/sale-explain.js'
import {
  getWindowHeightRpx
} from '../../utils/system.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRealm: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const pid = options.pid
    const spu = await Spu.getDetail(pid)

    const explain = await SaleExplain.getFixed()
    const windowHeight = await getWindowHeightRpx()
    const h = windowHeight - 100

    console.log(explain)

    this.setData({
      spu,
      explain,
      h
    })
  },
  onAddToCart(event) {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.CART
    })
  },
  onBuy(event) {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.BUY
    })
  },
  onGotoHome(event) {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  onGotoCart(event) {
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },

  onSpecChange(event) {
    this.setData({
      specs: event.detail
    })
  }


})