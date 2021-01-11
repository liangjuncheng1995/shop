class Cart {
  static SKU_MIN_COUNT = 1
  static SKU_MAX_COUNT = 77 //单个sku数量限制
  static CART_ITEM_MAX_COUNT = 77 //购物item的最大数量
  static STORAGE_KEY = "cart"

  //代理模式，代理数据
  _cartData = null


  constructor() {
    /**
     * 单例模式 保证全局购物车数据是一个对象
     */
    if (typeof Cart.instance === "Object") {
      return Cart.instance
    }
    Cart.instance = this
    return this
  }

  //在缓存中获取购物车全部数据
  getAllCartItemFromLocal() {
    return this._getCartData();
  }

  //判断购物车是否为空
  isEmpty() {
    const cart = this._getCartData();
    return cart.items.length === 0; // 如果是0就是空，不是0就不为空
  }

  //获取购物车商品的数量
  getCartItemCount() {
    return this._getCartData().items.length;
  }

  //添加购物车
  addItem(newItem) {
    if (this.beyondMaxCartItemCount()) {
      throw new Error('超过购物车最大数量')
    }
    this._pushItem(newItem);
    this._refreshStorage();
  }

  //购物车商品移除
  removeItem(skuId) {
    const oldItemIndex = this._findEqualItemIndex(skuId);
    const cartData = this._getCartData();
    cartData.items.splice(oldItemIndex, 1) //删除选中的sku商品
    this._refreshStorage();
  }

  //通过商品Id获取购物车中的商品 的索引序号
  _findEqualItemIndex(skuId) {
    const cartData = this._getCartData();
    return cartData.items.findIndex(item => {
      return item.skuId === skuId;
    })
  }

  //更新缓存中的数据
  _refreshStorage() {
    wx.setStorageSync(Cart.STORAGE_KEY, this._cartData);
  }


  _pushItem(newItem) {
    const cartData = this._getCartData();
    const oldItem = this.findEqualItem(newItem.skuId);
    if (!oldItem) { //没有旧的sku，说明是在 添加新的sku,不是添加商品的数量
      cartData.items.unshift(newItem); //这里的添加数据相当于添加进入到 _cartData的成员变量里的数据吗
    } else { //添加商品的数量
      this._combineItems(oldItem, newItem);
    }
  }

  //获取购物车商品中的老数据
  findEqualItem(skuId) {
    let oldItem = null;
    const items = this._getCartData().items;
    for (let i = 0; i < items.length; i++) {
      if (this._isEqualItem(items[i], skuId)) {
        oldItem = items[i];
        break;
      }
    }
    return oldItem;
  }

  _isEqualItem(oldItem, skuId) {
    return oldItem.skuId === skuId;
  }


  //向增加购物车中商品数量,考虑添加相同的sku
  _combineItems(oldItem, newItem) {
    this._plusCount(oldItem, newItem.count);
  }

  _plusCount(item, count) {
    item.count += count;
    if (item.count >= Cart.SKU_MAX_COUNT) {
      item.count = Cart.SKU_MAX_COUNT; //这里的添加数数量相当于添加进入到 _cartData的成员变量里的数据吗
    }
  }


  /**
   * 获取缓存中购物车数据
   */
  _getCartData() {
    if (this._cartData !== null) {
      return this._cartData;
    }
    let cartData = wx.getStorageSync(Cart.STORAGE_KEY);
    if (!cartData) {
      cartData = this._initCartDataStorage();
    }
    this._cartData = cartData;
    return cartData;

  }

  //通过缓存初始化购物车数据
  _initCartDataStorage() {
    const cartData = {
      items: []
    }
    wx.setStorageSync(Cart.STORAGE_KEY, cartData);
    return cartData;
  }

  /**
   * 判断购物车中添加的商品数量是否最大
   */
  beyondMaxCartItemCount() {
    const cartData = this._getCartData();
    return cartData.items.length >= Cart.CART_ITEM_MAX_COUNT;
  }

  //是否超卖
  static isSoldOut(item) {
    return item.sku.stock === 0
  }

  //是否下架
  static isOnline(item) {
    return item.sku.online
  }


}

export {
  Cart
}