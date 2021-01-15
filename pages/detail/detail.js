// pages/detail/detail.js
import {
  Spu
} from '../../models/spu.js'
import {
  CouponCenterType,
  ShoppingWay
} from '../../core/enum.js'
import {
  SaleExplain
} from '../../models/sale-explain.js'
import {
  getWindowHeightRpx
} from '../../utils/system.js'
import {
  Cart
} from '../../models/cart.js'
import {
  CartItem
} from '../../models/cart-item.js'
import {
  Coupon
} from '../../models/coupon.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRealm: false,
    cartItemCount: 0,
    optionName: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const pid = options.pid
    const spu = await Spu.getDetail(pid)

    const coupons = await Coupon.getTop2CouponsByCategory(spu.category_id);

    // const explain = await SaleExplain.getFixed()
    const windowHeight = await getWindowHeightRpx()
    const h = windowHeight - 100


    this.setData({
      spu,
      // explain,
      h,
      coupons
    })
    this.updateCartItemCount();
    this.setOptionName(spu);
  },

  async setOptionName(spu) {
    let coupons = await Coupon.getCouponsByCategory(spu.category_id);
    const wholeStoreCoupons = await Coupon.getWholeStoreCoupons();
    coupons = coupons.concat(wholeStoreCoupons);
    let isOk = true;
    console.log(coupons);
    for (let index = 0; index < coupons.length; index++) {
      if (coupons[index].status !== 1) {
        isOk = false;
        break;
      }
    }
    if (isOk) {
      this.setData({
        optionName: '立即查看'
      });
    } else {
      this.setData({
        optionName: '立即领取'
      });
    }
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

    if (event.detail.orderWay === ShoppingWay.CART) {

      const cart = new Cart();
      const cartItem = new CartItem(chosenSku, skuCount);
      cart.addItem(cartItem);
      this.updateCartItemCount();
    }

    if (event.detail.orderWay === ShoppingWay.BUY) {
      wx.navigateTo({
        url: `/pages/order/order?sku_id=${chosenSku.id}&count=${skuCount}&way=${ShoppingWay.BUY}`,
      })
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

  onGoToCouponCenter() {
    const type = CouponCenterType.SPU_CATEGORY;
    const cid = this.data.spu.category_id;
    wx.navigateTo({
      url: `/pages/coupon/coupon?cid=${cid}&type=${type}`
    })
  }




})