// miniprogram/pages/seeCategory/seeCategory.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var category= options.category;
    
    this.setData({
      category:category,
    })

    wx.cloud.callFunction({
      name:'getCategory',
      data:{
        category:category
      },
      success: (res) => {
       
        this.setData({
          posts: res.result.data,
        })
      },

      fail : err => {
        console.log(err)
      }
    });

    // console.log(this);


  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})