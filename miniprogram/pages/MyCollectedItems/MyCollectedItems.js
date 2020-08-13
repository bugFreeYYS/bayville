// miniprogram/pages/sold.js

Page({
  data: {},

  onLoad: function () {
    var app=getApp();
    console.log(app.globalData.user_infos.viewed_posts);
    wx.cloud.callFunction({
      name:"getMyCollectedPosts",
      data:{
        collected_posts: app.globalData.user_infos.saved_posts
      },
      success: (res) => {
        console.log('loaded my collected items')
        console.log(res.result.data);
        this.setData({
        
          posts: res.result.data
        })
      }
    })
  }
})