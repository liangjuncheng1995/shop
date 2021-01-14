const { CouponCenterType } = require("../../core/enum");
const { Activity } = require("../../models/activity");
const { Coupon } = require("../../models/coupon");

// pages/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
      const aName = options.name;
      const type = options.type;
      const cid = options.cid;

      let coupons;

      if(type === CouponCenterType.ACTIVITY) {
        const activity = await Activity.getActivityWithCoupon(aName);
        coupons = activity.coupons;
      } 
      if(type === CouponCenterType.SPU_CATEGORY) {
        coupons = await Coupon.getCouponsByCategory(cid);
        const wholeStoreCoupons = await Coupon.getWholeStoreCoupons();
        coupons = coupons.concat(wholeStoreCoupons);
      }

      
      this.setData({
        coupons
      })
  },

  

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

 
})