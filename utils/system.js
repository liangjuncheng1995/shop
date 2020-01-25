
import {
  promisic
} from './utils.js'

import {
  px2rpx
} from '../miniprogram_npm/lin-ui/utils/util.js'

const getSystemSize = async function() {
  const res = await promisic (wx.getSystemInfo)()
  return {
    windowHeight: res.windowHeight,
    windowWidth: res.windowWidth,
    screenWidth: res.screenWidth,
    screeHeight: res.screeHeight
  }
}

const getWindowHeightRpx = async function() {
  const res = await getSystemSize()
  return px2rpx(res.windowHeight)
}

export {
  getSystemSize,
  getWindowHeightRpx
}