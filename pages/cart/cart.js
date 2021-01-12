const {
  Calculator
} = require("../../models/calculator");
const {
  Cart
} = require("../../models/cart");
const {
  SpuPaging
} = require("../../models/spu-paging");
var cart = new Cart();

// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartItems: [],
    isEmpty: false,
    allChecked: false,
    totalPrice: 0,
    totalSkuCount: 0
  },

  /**
   * 生命周期函数--监听页面加载,数据新鲜度
   */
  async onLoad() {
    const cartData = cart.getAllSkuFromServer();
    this.setData({
      cartItems: cartData.items
    });
    this.initBottomSpuList();
  },

  async initBottomSpuList() {
    const paging = SpuPaging.getHotPaging();
    this.data.spuPaging = paging;
    const data = await paging.getMoreData();
    if (!data) {
      return;
    }
    wx.lin.renderWaterFlow(data.items);
  },

  onShow() {
    const cartItems = cart.getAllCartItemFromLocal().items;
    if (cart.isEmpty()) {
      this.empty();
      return
    }

    this.setData({
      cartItems
    })
    this.notEmpty();
    this.isAllChecked();
    this.refreshCartData();
  },

  refreshCartData() {
    const checkedItems = cart.getCheckedItems();
    const calculator = new Calculator(checkedItems);
    calculator.calc();
    this.setCalcData(calculator);
  },

  setCalcData(calculator) {
    const totalPrice = calculator.getTotalPrice();
    const totalSkuCount = calculator.getTotalSkuCount();
    this.setData({
      totalPrice,
      totalSkuCount
    })
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
    const allChecked = cart.isAllChecked();
    this.setData({
      allChecked
    })
  },

  onDeleteItem(event) {
    this.isAllChecked();
    this.refreshCartData();
  },

  onSingleCheck(event) {
    this.isAllChecked();
    this.refreshCartData();
  },

  onCheckAll(event) {
    const checked = event.detail.checked;
    cart.checkAll(checked);
    this.setData({
      cartItems: this.data.cartItems
    })
    this.refreshCartData();
  },

  onCountFloat(event) {
    this.refreshCartData();
  },

  onSettle(event) {
    if(this.data.totalSkuCount <= 0) {
      return;
    } 
    wx.navigateTo({
      url: `/pages/order/order?way=${1}`,
    })
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    const data = await this.data.spuPaging.getMoreData();
    if (!data) {
      return;
    }
    wx.lin.renderWaterFlow(data.items);
    if (!data.moreData) {
      this.setData({
        loadingType: 'end',
        logo: true
      });
    }
  },




})