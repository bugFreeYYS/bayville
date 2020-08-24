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
    posts_display_count: 2
  },

  // Load the page
  onLoad: function () {
    var that = this;
    var post;

    wx.stopPullDownRefresh();
    //未完成： 加载完posts之后读取用户昵称并显示在主页上， 异步函数待研究
    var get_all_posts = new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: "getPosts",
        success: (res) => {
          that.setData({
            posts: res.result.data
          })
          for (post in that.data.posts) {
            that.add_nickname(that.data.posts[post])
          }
          that.setData({
            posts_display: that.data.posts.slice(0, that.data.posts_display_count)
          });

          resolve('success');
        }
      });

    })

    get_all_posts.then(function (msg) {
      // console.log(msg)
    });

    console.log(this.data);

  },

  add_nickname: async function (data) {
    await wx.cloud.callFunction({
      name: 'getNickname',
      data: {
        openid: data.seller_id
      },
      success: (res) => {
        data['nickname'] = res.result.data.nickname;

      }
    })
  },

  // route to listing page
  goToItem: function (e) {
    var itemid = e.currentTarget.dataset.itemid;

    wx.navigateTo({
      url: '/pages/seeItem/seeItem?itemid=' + itemid,
    })
  },

  // route to category page
  goToCategory: function (e) {
    var that = this;
    var category = e.currentTarget.dataset.category.name;
    console.log(category);
    wx.navigateTo({
      url: '/pages/seeCategory/seeCategory?category=' + category,
    })
  },

  // reload the page
  onPullDownRefresh: function () {
    var that = this;
    this.onLoad();
  },

  // load more listings
  onReachBottom: function () {
    var that = this;
    // loading more
    wx.showToast({
      title: '玩命加载中',
      icon: 'loading',
      duration: 500
    })

    var count = this.data.posts_display_count + 2
    if (count > this.data.posts.length + 1) {
      // end of listings
      wx.showToast({
        title: '没有更多了',
        icon: 'none',
        duration: 1000
      })
    } else {
      this.setData({
          posts_display_count: count
        }),
        this.setData({
          posts_display: this.data.posts.slice(0, this.data.posts_display_count)
        })
    }
  },

  // search bar re-direction
  search: function () {
    wx.navigateTo({
      url: '/pages/searchResults/searchResults',
    })
  }
})