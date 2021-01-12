// components/cart-item/index.js
import {
  Cart
} from "../../models/cart";
import {
  parseSpecValue
} from "../../utils/sku";
const cart = new Cart();

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
      const skuId = this.properties.cartItem.skuId;
      cart.removeItem(skuId);
      this.setData({
        cartItem: null
      })
      this.triggerEvent("itemdelete", {
        skuId
      })
    },

    checkedItem(event) {
      const checked = event.detail.checked;
      cart.checkItem(this.properties.cartItem.skuId);
      this.properties.cartItem.checked = checked;
      this.triggerEvent('itemcheck',{

      })
    }
  }
})