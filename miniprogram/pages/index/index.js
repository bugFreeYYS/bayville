Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 100,
    ads: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    category :[
      {name:'Textbook', icon: '../../images/index/textbook.png'},
      {name:'Electronics', icon: '../../images/index/electronics.png'}, 
      {name:'Clothes', icon: '../../images/tab/purchase_on.png'},
      {name:'Boyfriends', icon: '../../images/tab/purchase_on.png'}, 
      {name:'Girlfriends', icon: '../../images/tab/purchase_on.png'}, 
      {name:'Wifes', icon: '../../images/tab/purchase_on.png'}, 
      {name:'Husbands', icon: '../../images/tab/purchase_on.png'}, 
      {name:'Trump', icon: '../../images/index/trump.png'}
    ]
  },
  onLoad: function(){
    wx.cloud.callFunction({
      name: "getPosts",
      success: (res)=> {
        this.setData({
          posts: res.result.data
        })
      }
    })
    
  },

  goToItem: function(e){

    var that=this;
    var itemid=  e.currentTarget.dataset.itemid;
    //console.log(itemid);
    wx.navigateTo({
      url: '/pages/seeItem/seeItem?itemid='+itemid,
    })
  },

  goToCategory: function(e){
    var that=this;
    var category= e.currentTarget.dataset.category.name;
    console.log(category);
    wx.navigateTo({
      url: '/pages/seeCategory/seeCategory?category='+category,
    })
  }

})
