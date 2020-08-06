// miniprogram/pages/seeItem/seeItem.js
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
    var itemid= options.itemid;
    
    this.setData({
      itemid:itemid,
    })

    wx.cloud.callFunction({
      name:'getItemView',
      data:{
        itemid:itemid
      },
      success: (res) => {
       
        this.setData({
          info: res.result.data[0],
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