const showToast = function(title) {
  wx.showToast({
    icon: 'none',
    title,
    duration: 2000,
  })
}

export {
  showToast
}