import {
  config
} from '../config/config.js'
import {
  codes
} from '../config/exception-config.js';
import {
  HttpException
} from '../core/http-exception.js';
import {
  Token
} from '../models/token.js';
import {
  promisic
} from './utils.js'

class Http {
  static async request({
    url,
    data,
    method = "GET",
    refetch = true,
    throwError = false
  }) {
    let res;
    try {
      res = await promisic(wx.request)({
        url: `${config.apiBaseUrl}${url}`,
        data,
        method,
        header: {
          "content-type": "application/json",
          'authorization': `Bearer ${wx.getStorageSync('token')}`,
          "appkey": config.appkey
        },
      })
    } catch (e) {
      // 1.无网的情况， 请求失败
      // 2.API 正整数，服务端抛出的异常，成功调用api，参数错误
      // 服务端bug,try-catch 不能捕获第二种情况
      // 二次重发 401 判断状态码
      // 前端统一的异常处理 HTTP,可是不能个性化
      // 定制化一个 前端的 message 描述
      // 能复用后端的message就复用，不能就定制化
      // 服务端返回 最好下滑线，尽量不要缩写
      // 404 空数据 UnifyResponse

      if (throwError) { // 如果调用方不想使用自定的toast
        throw new HttpException(-1, codes[-1]);
      }

      Http.showError(-1); //网络中断
      return null;
    }
    console.log("data的值")
    console.log(data)
    const code = res.statusCode.toString();
    if (code.startsWith("2")) {
      return res.data;
    } else {
      if (code === '401') {
        // 二次重发
        if (data.refetch) { //避免重复调用
          Http._refetch({
            url,
            data,
            method
          });
        }
      } else { //处理非2 开头，非401状态码的处理 

        if (throwError) {//如果调用方不想使用自定的toast,通过设置throwError的true false 来使用
          throw new HttpException(res.data.code, res.data.msg, code);
        }

        if (code === '404') { //需要单独处理404
          if (res.data.code !== undefined) {
            return null;
          }
          return res.data;
        }
        const error_code = res.data.code || res.data.error_code;
        Http.showError(error_code, res.data);
      }
    }

    return res.data
  }


  static async _refetch(data) {
    const token = new Token();
    await token.getTokenFromServer();
    data.refetch = false;
    return await Http.request(data)
  }

  static showError(error_code, serverError) {
    let tip;
    if (!error_code) {
      tip = codes[9999]
    } else {
      if (codes[error_code] === undefined) {
        tip = serverError.msg || serverError.message;
      } else {
        tip = codes[error_code];
      }
    }

    wx.showToast({
      icon: "none",
      title: tip,
      duration: 3000
    })
  }
}





// 动态语言里（js,python），将一个函数当做参数传入另一个函数里面是常见的

// callback
// promise
// async await
// 使用 await 要有返回的结果 
// 统一异常处理方案
// password username 微信已经操作
// code
// 写一个功能的时候，先不用想在哪里调用，先写逻辑

export {
  Http
}