Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,

    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 100,
    ads: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    category: [{
        name: 'Textbook',
        icon: '../../images/index/textbook.png'
      },
      {
        name: 'Electronics',
        icon: '../../images/index/electronics.png'
      },
      {
        name: 'Clothes',
        icon: '../../images/tab/purchase_on.png'
      },
      {
        name: 'Boyfriends',
        icon: '../../images/tab/purchase_on.png'
      },
      {
        name: 'Girlfriends',
        icon: '../../images/tab/purchase_on.png'
      },
      {
        name: 'Wifes',
        icon: '../../images/tab/purchase_on.png'
      },
      {
        name: 'Husbands',
        icon: '../../images/tab/purchase_on.png'
      },
      {
        name: 'Trump',
        icon: '../../images/index/trump.png'
      }
    ],
    posts_display_count: 3
  },

  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  console.log("用户的code:" + res.code);
                  // 可以传给后台，再经过解析获取用户的 openid
                  // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                  // wx.request({
                  //     // 自行补上自己的 APPID 和 SECRET
                  //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=自己的APPID&secret=自己的SECRET&js_code=' + res.code + '&grant_type=authorization_code',
                  //     success: res => {
                  //         // 获取到用户的 openid
                  //         console.log("用户的openid:" + res.data.openid);
                  //     }
                  // });
                }
              });
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });

    wx.cloud.callFunction({
      name: "getPosts",
      success: (res) => {
        this.setData({
          posts: res.result.data
        }),
        this.setData({
          posts_display: this.data.posts.slice(0,this.data.posts_display_count)
        })
      }
    })
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },

  goToItem: function (e) {
    var itemid = e.currentTarget.dataset.itemid;
    //console.log(itemid);
    wx.navigateTo({
      url: '/pages/seeItem/seeItem?itemid=' + itemid,
    })
  },

  goToCategory: function (e) {
    var that = this;
    var category = e.currentTarget.dataset.category.name;
    console.log(category);
    wx.navigateTo({
      url: '/pages/seeCategory/seeCategory?category=' + category,
    })
  },

  continuousScroll: function(event){
    var count = this.data.posts_display_count + 4;
    this.setData({
      posts_display_count : count
    })
  }

})