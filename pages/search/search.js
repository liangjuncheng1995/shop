// pages/search/search.js
import {
  Historykeyword
} from '../../models/history-keyword.js'
import {
  Tag
} from '../../models/tag.js'
import {
  Search
} from '../../models/search.js'
import {
  showToast
} from '../../utils/ui.js'
const history = new Historykeyword()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyTags: [],
    searchPaging: null,
    items: []
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
    this.setData({
      search: true,
      items: []
    })
    const keyword = event.detail.value || event.detail.name
    if (!keyword) {
      showToast("请输入关键字")
      return
    }
    history.save(keyword)
    this.setData({
      historyTags: history.get()
    })
    this.showLoading()

    const paging = Search.search(keyword)
    this.setData({
      searchPaging: paging
    })

    const data = await paging.getMoreData()
    this.hideLoading()
    this.bindItems(data)
  },

  showLoading() {
    wx.lin.showLoading({
      color: "#157658",
      type: "flash",
      fullScreen: true
    })
  },

  hideLoading() {
    wx.lin.hideLoading()
  },

  async onReachBottom() {
    const data = await this.data.searchPaging.getMoreData()
    if (!data) {
      return
    }

    this.bindItems(data)

    if (!data.moreData) {
      this.setData({
        loadingType: "end"
      })
    }
  },

  onCancel(event) {
    this.setData({
      search: false
    })
  },

  bindItems(data) {
    if (data.accumulator.length !== 0) {
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