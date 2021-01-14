const { Cart } = require("./models/cart");
const { Token } = require("./models/token");

//app.js
App({
  onLaunch() {
    const cart = new Cart();
    if(!cart.isEmpty()) {
      wx.showTabBarRedDot({
        index: 2,
      })
    }
    const token = new Token();
    token.verify();
  }
})