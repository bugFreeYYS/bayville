Page({
  data: {
    nick_name:'default'
  },
  // onLoad: function(){
    // wx.cloud.callFunction({
    //   name: "getMyPosts",
    //   success: (res)=> {
    //     console.log('successfully got my posts')
    //     this.setData({
    //       posts: res.result.data
    //     })
    //   }
    // });

  //   wx.getUserInfo({
  //     success: (res) => {
  //       this.setData({
  //         user_info:res.user_info
  //       })
  //     },
  //   });

  //   console.log(this.data.user_info.nickname)
    
  // },

  onLoad: function() {
    var that= this;
    // 查看是否授权
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: (res) => {
              that.setData({
                nick_name: res.userInfo.nickName
              });
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
  bindGetUserInfo (e) {
    console.log(e.detail.userInfo)
  },

  goToItem: function(e){

    
    var itemid=  e.currentTarget.dataset.itemid;
    //console.log(itemid);
    wx.navigateTo({
      url: '/pages/seeItem/seeItem?itemid='+itemid,
    })
  }

})
