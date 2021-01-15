const { Http } = require("../utils/http");

class User {
  static async updateUserInfo(data) {
    return Http.request({
      url: `/user/wx_info`,
      data,
      method: 'POSt'
    })
  }
}

export {
  User
}