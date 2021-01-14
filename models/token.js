import { config } from "../config/config";
import { promisic } from "../utils/utils";

class Token {
  // 1.携带token
  // server 请求token
  // 登录之后 token -> storage
  // token : 1.token不存在 2.token存在，可能过期
  // 无感知静默登录

  constructor() {
    this.tokenUrl = config.apiBaseUrl + "/token";
    this.verifyUrl = config.apiBaseUrl + "/token/verify"
  }

  async verify() {
    const token = wx.getStorageSync('token');
    if(!token) {
      await this.getTokenFromServer();
    } else {
      await this._verifyFromServer(token);
    }
  }

  async getTokenFromServer() {
    console.log( wx.login());
    const r = await wx.login();
    const code = r.code;

    const res = await promisic(wx.request)({
      url: this.tokenUrl,
      method: "POST",
      data: {
        account: code,
        type: 0
      }
    })
    wx.setStorageSync('token', res.data.token);
    return res.data.token;
  }

  async _verifyFromServer(token) {
    const res = await promisic(wx.request)({
      url: this.verifyUrl,
      method: "POST",
      data: {
        token
      }
    });
    const valid = res.data.is_valid;
    if(!valid) {
      return this.getTokenFromServer();
    }
  }

}

export {
  Token
}