// pages/search/search.js
import {
  Historykeyword
} from '../../models/history-keyword.js'
import {
  Tag
} from '../../models/tag.js'
const history = new Historykeyword()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyTags: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const historyTags = history.get()
    const hotTags = await Tag.getSearchTags()
    this.setData({
      historyTags,
      hotTags
    })
  },

  onSearch(event) {
    const keyword = event.detail.value
    history.save(keyword)
    this.setData({
      historyTags: history.get()
    })
  },

  onDeleteHistory(event) {
    history.clear()
    this.setData({
      historyTags: []
    })
  }
})