class CouponBO {
  constructor(coupon) {
    this.type = coupon.type;
    this.fullMoney = coupon.full_money;
    this.rate = coupon.rate;
    this.minus = coupon.minus;
    this.id = coupon.id;
    this.startTime = coupon.start_time;
    this.endTime = coupon.end_time;
    this.wholeStore = coupon.whole_store;
    this.title = coupon.title;
    this.satisfaction = false;

    this.categoryIds = coupon.categories.map(category => {
      return category.id
    });
  }

  meetCondition(order) {
    let categoryTotalPrice;

    if (this.wholeStore) {
      // 全场券无视适用分类
      categoryTotalPrice = order.getTotalPrice();
    } else {
      categoryTotalPrice = order.getTotalPriceByCategoryIdList(this.categoryIds);
    }

    let satisfaction = false;

    switch (this.type) {
      case CouponType.FULL_MINUS:
      case CouponType.FULL_OFF:
        satisfaction = this._fullTypeCouponIsOK(categoryTotalPrice);
        break;
      case CouponType.NO_THRESHOLD_MINUS:
        satisfaction = true;
        break;
      default:
        break;
    }
    this.satisfaction = satisfaction;
  }

}

export {
  CouponBO
}