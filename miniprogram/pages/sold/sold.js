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

  confirmDelete: function(e){
    let that = this;
    console.log('delete');
    wx.showModal({
      title: '提示',
      content: '确认删除',
      success (res) {
        if (res.confirm) {
          that.deletePost(e);
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  deletePost: function(e) {
    let that= this;
    console.log(e.currentTarget.dataset.itemid);
    wx.cloud.callFunction({
      name:"deleteMyPost",
      data: {
        itemid: e.currentTarget.dataset.itemid
      },
      success: (res) =>{
        console.log('云端数据已删除');
        that.onLoad();
      }
    })
  }
})