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
    displayed_users: 'default'
  },
  async onLoad() {
    var that = this;
    var post;

    var getallposts = new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: "getPosts",
        success: (res) => {
          that.setData({
            posts: res.result.data

          });
          resolve(res.result.data);
        }
      });
    })

    
    getallposts.then(function () {
      for (post in that.data.posts) {
        var cur_seller_id = that.data.posts[post].seller_id
        // if (!(cur_seller_id in that.data.displayed_users)) {

          await wx.cloud.callFunction({
            name: "getNickname",
            data: {
              openid: seller_id
            },
            success: (res) => {
              console.log(res.result.data.nickname);
              this.data.posts[index].nickname=res.result.data.nickname;
            }
      
          })
        // }
      }

    })
    console.log(this.data)

  },

  getNickname: function(seller_id, index) {
    wx.cloud.callFunction({
      name: "getNickname",
      data: {
        openid: seller_id
      },
      success: (res) => {
        console.log(res.result.data.nickname);
        this.data.posts[index].nickname=res.result.data.nickname;
      }

    })
    // return nickname;
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



})