// miniprogram/pages/seeCategory/seeCategory.js
Page({

  /**
   * Page initial data
   */
  data: {
    

    rank_methods: [
      { name: 'price low to high', value: 'price low to high'},
      { name: 'price high to low', value:  'price high to low' }
    
    ],


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

  },
  goToItem: function(e){

    var that=this;
    var itemid=  e.currentTarget.dataset.itemid;
    //console.log(itemid);
    wx.navigateTo({
      url: '/pages/seeItem/seeItem?itemid='+itemid,
    })
  },

  rank_items: function(e){

    let rank_method= e.detail.value;

   
    
    if (rank_method=='price high to low'){
     var sorted_posts =this.data.posts.sort(function(a,b){
                                                      if(parseFloat(a.title) > parseFloat(b.title)) return -1;
                                                      else return 1;
                                                    })
     this.setData({
       posts: sorted_posts
     })
    }
    else{
      var sorted_posts =this.data.posts.sort(function(a,b){
                                                       if(parseFloat(a.title) > parseFloat(b.title)) return 1;
                                                       else return -1;
                                                     })
      this.setData({
        posts: sorted_posts
      })
     }
  },
})