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
    var post;
    var get_all_posts= new Promise(function(resolve, reject){
      wx.cloud.callFunction({
        name: "getPosts",
        success: (res) => {
          that.setData({
            posts: res.result.data
          }),
          that.setData({
            posts_display: that.data.posts//.slice(0,that.data.posts_display_count)
          });
          for (post in that.data.posts){
             that.add_nickname(that.data.posts[post].seller_id,function(nickname){
              
                that.data.posts[post].nickname=nickname;
              
            })
          }
          resolve('success');

          
        }
      });
      
    })

      get_all_posts.then(function(msg){
        // console.log(msg)
      })
      
      

    
  },

  add_nickname: async function(openid,callback){
    await wx.cloud.callFunction({
      name:'getNickname',
      data:{
        openid:openid
      },
      success: (res) =>{
        // console.log(res.result.data.nickname);
        return callback(res.result.data.nickname)
      }
    })
  },


  goToItem: function (e) {
    var itemid = e.currentTarget.dataset.itemid;
    
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
  },



})