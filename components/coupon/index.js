// components/coupon/index.js
import {
  showToast
} from "../../utils/ui";
import {
  CouponData
} from "./coupon-data";
import {
  CouponStatus
} from "../../core/enum";
import {
  Coupon
} from "../../models/coupon";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    coupon: Object,
    status: {
      type: Number,
      value: CouponStatus.CAN_COLLECT
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _coupon: Object,
    _status: CouponStatus.CAN_COLLECT, //设置默认值，可领取
    userCollected: false
  },

  observers: {
    'coupon,status': function (coupon, status) {
      if (!coupon) {
        return;
      }
      this.setData({
        _coupon: new CouponData(coupon, status)
      });
      if (status === CouponStatus.AVAILABLE) {
        this.setData({
          userCollected: true,
          _status: status
        });
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async onGetCoupon(event) {
      if (this.data.userCollected) {
        //跳转page 
        // wx.navigateTo({
        //   url: ``
        // });
        //跳转tapbar
        wx.switchTab({
          url: `/pages/category/category`
        });
        return;
      }
      if (this.data._status === CouponStatus.AVAILABLE) {
        showToast('您已领取了该优惠券,在"我的优惠券"中可查看');
        return;
      }
      const couponId = event.currentTarget.dataset.id;
      let msg;
      try {
        msg = await Coupon.collectCoupon(couponId);
      } catch (e) {
        if (e.errorCode === 40006) {
          this.setUserCollected();
          showToast('您已领取了该优惠券,在"我的优惠券"中可查看');
        }
        return;
      }
      if (msg.code === 0) {
        this.setUserCollected();
        showToast('领取成功，在"我的优惠券"中查看');
      }
    },

    setUserCollected() {
      this.setData({
        _status: CouponStatus.AVAILABLE,
        userCollected: true
      });
    }
  }
})