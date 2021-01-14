import {
  OrderExceptionType
} from "../core/enum";
import {
  OrderException
} from "../core/order-exception";

class Order {
  orderItems;
  localItemCount;

  constructor(orderItems, localItemCount) {
    this.orderItems = orderItems;
    this.localItemCount = localItemCount;
  }

  checkOrderIsOk() {
    this.orderItems.forEach(item => {
      item.isOK();
    })
  }

  _orderIsOk() {
    this._emptyOrder();
    this._containNotOnSaleItem();
  }

  _emptyOrder() {
    if (this.orderItems.length === 0) {
      throw new OrderException('订单中没有任何商品', OrderExceptionType.EMPTY);
    }
  }

  _containNotOnSaleItem() {
    if (this.orderItems.length !== this.localItemCount) {
      throw new OrderException("服务器返回订单商品数量与实际不相符，可能是有商品已下架", OrderExceptionType.NOT_ON_SALE);
    }
  }

}

export {
  Order
}