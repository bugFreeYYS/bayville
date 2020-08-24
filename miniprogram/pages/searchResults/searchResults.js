// pages/searchResults.js
Page({
  data: {},

  onLoad: function () {},

  search: function (event) {
    this.setData({
      keywords: event.detail.value
    })
    wx.cloud.callFunction({
      name: "searchResults",
      data: {
        keywords: this.data.keywords
      },
      success: (res) => {
        this.setData({
          content: res.result.data
        })
      }
    })
  }
})