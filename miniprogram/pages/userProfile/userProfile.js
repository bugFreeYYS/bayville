Page({
  data: {
    login: false,
    userInfo: {}
  },

  onLoad: function() {
    var that= this;
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              that.setData({
                userInfo: res.userInfo
              });
              that.setData({
                login: true
              })
              console.log(res.userInfo)
            }
          })
        }
      },
    });

    wx.cloud.callFunction({
      name: "getMyPosts",
      success: (res)=> {
        console.log('successfully got my posts')
        this.setData({
          posts: res.result.data
        })
      }
    });
  },

  onGetUserInfo: function(event){
    this.onLoad()
  },

  redirect_sold: function(event){
    wx.navigateTo({
      url: '/pages/sold/sold',
    })
  },
  redirect_viewed: function(event){
    wx.navigateTo({
      url: '/pages/MyViewedItems/MyViewedItems',
    })
  }
})
