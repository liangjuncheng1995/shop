// components/cart-item/index.js
import {
  Cart
} from "../../models/cart";
import {
  parseSpecValue
} from "../../utils/sku";
Component({
  /**
   * 组件的属性列表
   */
  //不稳定的绑定变量
  properties: {
    cartItem: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    specStr: String,
    discount: Boolean,
    soldOut: Boolean,
    online: Boolean,
    stock: Cart.SKU_MAX_COUNT,
    skuCount: Cart.SKU_MIN_COUNT
  },

  observers: {
    cartItem: function (cartItem) {
      if (!cartItem) {
        return;
      }
      const specStr = parseSpecValue(cartItem.sku.specs)
      const discount = cartItem.sku.discount_price
      const soldOut = Cart.isSoldOut(cartItem);
      const online = Cart.isOnline(cartItem);
      this.setData({
        specStr,
        discount,
        soldOut,
        online,
        stock: cartItem.sku.stock,
        skuCount: cartItem.count
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDelete(event) {
      const skuId = this.properties.cartItem.sku.id;
      const cart = new Cart();
      cart.removeItem(skuId);
      this.setData({
        cartItem: null
      })
      this.triggerEvent("itemdelete", {
        skuId
      })
    }
  }
})