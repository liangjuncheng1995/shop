// pages/order/order.js
import { Cart } from "../../models/cart";
import { Coupon } from "../../models/coupon";
import { CouponBO } from "../../models/coupon-bo";
import { Order } from "../../models/order";
import { OrderItem } from "../../models/order-item";
import { Sku } from "../../models/sku";
const cart = new Cart();
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
    let orderItems; 
    let localItemCount;

    const skuIds = cart.getCheckedSkuIds();
    orderItems = await this.getCartOrderItems(skuIds);
    localItemCount = skuIds.length;

    const order = new Order(orderItems, localItemCount);

    try {
      order.checkOrderIsOk();
    } catch (error) {
      console.log(error);
      return;
    }

    const coupons = await Coupon.getMySelfWithCategory();
    const couponBOList = this.packageCouponBOList(coupons, order);

    this.setData({
      orderItems,
      couponBOList
    })

  },

  packageCouponBOList(coupons, order) {
    return coupons.map(coupon => {
      const couponBO = new CouponBO(coupon);
      // couponBO.meetCondition(order);
      return couponBO;
    })
  },

  async getSingleOrderItems(skuId, count) {
    const skus = await Sku.getSkusByIds(skuId);
    return [new OrderItem(skus[0], count)];
  },

  async getCartOrderItems(skuIds) {// 同步最新的SKU数据
    const skus = await Sku.getSkusByIds(skuIds);
    const orderItems = this.packageOrderItems(skus);
    return orderItems;
  },

  packageOrderItems(skus) {
    return skus.map(sku => {
      const count = cart.getSkuCountBySkuId(sku.id);
      return new OrderItem(sku, count);
    })
  }
})