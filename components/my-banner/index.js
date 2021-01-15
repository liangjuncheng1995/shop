const { User } = require("../../models/model");
const {
  promisic
} = require("../../utils/utils");

// components/my-banner/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    couponCount: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    showLoginBtn: false
  },

  lifetimes: {
    async attached() {
      if (!await this.hasAuthUserInfo()) {
        this.setData({
          showLoginBtn: true
        })
      }
    }
  },


  /**
   * 组件的方法列表
   */
  methods: {
    async hasAuthUserInfo() {
      const setting = await promisic(wx.getSetting)();
      const userInfo = setting.authSetting['scope.userInfo'];
      return !!userInfo;
    },

    async onAuthUserInfo(event) {
      if (event.detail.userInfo) {
        const success = await User.updateUserInfo(event.detail.userInfo);
        console.log(success);
        this.setData({
          showLoginBtn: false
        });
      }
    },

    onGotoMyCoupon(event) {
      wx.navigateTo({
        url: `/pages/my-coupon/my-coupon`
      })
    }
  }
})