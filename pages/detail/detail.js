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
import { Cart } from '../../models/cart.js'
import { CartItem } from '../../models/cart-item.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRealm: false,
    cartItemCount: 0
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
    this.updateCartItemCount();
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

  onShopping(event) {
    const chosenSku = event.detail.sku;
    const skuCount = event.detail.skuCount;

    if(event.detail.orderWay === ShoppingWay.CART) {
      
      const cart = new Cart();
      const cartItem = new CartItem(chosenSku, skuCount)
      ;
      cart.addItem(cartItem);
      this.updateCartItemCount();
    }
  },

  updateCartItemCount() {
    const cart = new Cart();
    this.setData({
      cartItemCount: cart.getCartItemCount(),
      showRealm: false
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
  },

  


})