// pages/search/search.js
import {
  Historykeyword
} from '../../models/history-keyword.js'
import {
  Tag
} from '../../models/tag.js'
import { Search } from '../../models/search.js'
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

  async onSearch(event) {
    const keyword = event.detail.value
    history.save(keyword)
    this.setData({
      historyTags: history.get()
    })

    const paging = Search.search(keyword)
    const data = await paging.getMoreData()
    this.bindItems(data)
  },

  bindItems(data) {
    if(data.accumulator.length !== 0) {
      this.setData({
        items: data.accumulator
      })
    }
  },

  onDeleteHistory(event) {
    history.clear()
    this.setData({
      historyTags: []
    })
  }
})