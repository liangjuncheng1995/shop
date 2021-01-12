const { Cart } = require("../../models/cart")
var cart = new Cart();

// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartItems: [],
    isEmpty: false,
    allChecked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  onShow() {
    var cart = new Cart();
    const cartItems = cart.getAllCartItemFromLocal().items;
    if(cart.isEmpty()) {
      this.empty();
      return
    }

    this.setData({
      cartItems
    })
    this.notEmpty();
    this.isAllChecked();
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

  // 是否全选,可以直接去缓存中遍历所有数据的 checked 字段状态如何就行了
  isAllChecked() {
    var cart = new Cart();
    const allChecked = cart.isAllChecked();
    console.log(allChecked)
    this.setData({
      allChecked
    })
  },

  onDeleteItem(event) {
    this.isAllChecked();
  },

  onSingleCheck(event) {
    this.isAllChecked();
  },

  onCheckAll(event) {
    const checked = event.detail.checked;
    cart.checkAll(checked);
    const cartItems = cart.getAllCartItemFromLocal().items;
    this.setData({
      cartItems
    })
  }



  
})