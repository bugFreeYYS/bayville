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
  },
  goToMyItem: function (e) {
    var itemid = e.currentTarget.dataset.itemid;
    wx.navigateTo({
      url: '/pages/editPost/editPost?itemid=' + itemid,
    })
  },
})