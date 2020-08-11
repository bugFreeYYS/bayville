// miniprogram/pages/sold.js

Page({
  data: {},

  onLoad: function () {
    wx.cloud.callFunction({
      name:"getMyPosts",
      success: (res) => {
        this.setData({
          posts: res.result.data
        })
      }
    })
  }
})