const { Cart } = require("../../models/cart")

// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartItems: [],
    isEmpty: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  onShow() {
    const cart = new Cart();
    const cartItems = cart.getAllCartItemFromLocal.items;

    if(cart.isEmpty()) {
      this.empty();
      return
    }

    this.setData({
      cartItems
    })
    this.notEmpty();
  },

  empty() {
    this.setData({
      isEmpty: true
    })
    wx.hideTabBarRedDot({
      index: 2, //tabbar 从左到右序号为2的tab
    })
  },

  notEmpty() {
    this.setData({
      isEmpty: false
    });
    wx.showTabBarRedDot({
      index: 2
    })
  },

  
})