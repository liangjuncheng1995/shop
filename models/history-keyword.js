class Historykeyword {
  // 静态
  // 单例模式
  static MAX_ITEM_COUNT = 20
  static KEY = 'keywords'

  keywords = []
  
  constructor() {
    if (typeof Historykeyword.instance === 'object') {
      return Historykeyword.instance
    }
    Historykeyword.instance = this
    this.keywords = this._getLocalKeywords()
    return this
  }

  save(keyword) {
    const items = this.keywords.filter(k => {
      return k === keyword
    })
    if (items.length !== 0) {
      return
    }
    if (this.keywords.length >= Historykeyword.MAX_ITEM_COUNT) {
      this.keywords.pop()
    }

    this.keywords.unshift(keyword)
    this._refreshLocal()
    // 队列
  }

  get() {
    return this.keywords
  }

  clear() {
    this.keywords = []
    this._refreshLocal()
  }

  _refreshLocal() {
    wx.setStorageSync(Historykeyword.KEY, this.keywords)
  }

  _getLocalKeywords() {
    const keywords = wx.getStorageSync(Historykeyword.KEY)
    if (!keywords) {
      wx.setStorageSync(Historykeyword.KEY, [])
      return []
    }
    return keywords
  }
}

export  {
  Historykeyword
}