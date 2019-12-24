// pages/home/home.js
import {config} from '../../config/config.js'
import { Theme } from '../../model/theme.js'
Page({

 
  data: {
    topTheme: null
  },

 
  onLoad: async function (options) {
    // console.log(theme.getHomeLocationA())

    const data = await Theme.getHomeLocationA()
    this.setData({
      topTheme: data[0]
    })
    // Theme.getHomeLocationA(data => {
    //   this.setData({
    //     topTheme: data[0]
    //   })
    // })
    // Theme.getHomeLocationA()
  },

  onReachBottom: function () {

  },

  
  onShareAppMessage: function () {

  }
})