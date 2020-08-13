// pages/searchResults.js
Page({
  data: {
  },

  onLoad: function () {

  },

  search: function (event) {
    this.setData({
      keywords : event.detail.value
    })
    wx.cloud.callFunction({
      name: "searchResults",
      data: {
        keywords: this.data.keywords
      },
      success: (res) => {
        console.log("数据", res.result.data);
        this.setData({
          content: res.result.data
        })
      }
    })
  }
})