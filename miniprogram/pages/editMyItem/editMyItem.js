//index.js
Page({
  data:{
    title: '',
    date: '选择日期',
    category_list : ["Textbook", "Electronics", "Furniture", "Cosmetics"],
    category_selection_index:0,
    location_list : ["Utown", "Science", "FASS", "SOC"],
    location_selection_index:0,
    image_urls : [],
    image_urls_cloud: [],
    value:0
  },
  
  onLoad: function(options){
    this.setData({
      itemid: options.itemid,
    })

    this.fillOriginalInfo();

    wx.cloud.callFunction({
      name:"login",
      success : (res) =>{
        console.log('retrieved openid');
        this.setData({
          openid:res.result.openid
        })
      }
    });
  },

  fillOriginalInfo: function(){
    var that= this;
    wx.cloud.callFunction({
      name: 'getItemView',
      data:{
        itemid: that.data.itemid
      },
       
      success: (res) => {
        console.log('original data retireved')
        that.setData({
          originalValues:res.result.data,
          image_urls : res.result.data.image_urls_cloud
        })
      }
    })

  },

  async uploadImages(){
    var that = this;
    var image_urls = this.data.image_urls;
    var image;

    this.setData({image_urls_cloud : []})
    for (image of image_urls){

      if(image.includes('posts/')) continue;
      
      var date= new Date();
      var timestamp= date.getTime().toString()
      var cloud_path = "posts/".concat(image.split('/')[3]+'_').concat(that.data.openid+'_').concat(timestamp);
      console.log(cloud_path);
      await wx.cloud.uploadFile({
        cloudPath: cloud_path,
        filePath: image,
      }).then(res =>{
        const image_urls_cloud = that.data.image_urls_cloud.concat(res.fileID);
        that.setData({ image_urls_cloud: image_urls_cloud });
        
      }) 
    }
  },

  async postSell(event){
    var that=this;
    wx.showLoading({
      title: '发布中',
    })
    
    await this.uploadImages();
    
    wx.cloud.callFunction({
      name: "editMyPost",
      data: {
        edited: event.detail.value,
        itemid: that.data.itemid
        
      },
      success: (res) => {
        console.log('create success!');
        wx.showToast({
          title: 'Success',
          icon: 'success',
          duration: 2000
        });
        setTimeout(function(){
          wx.reLaunch({
            url: '/pages/index/index',
          })
          }, 3000
        )
      }
 
    });

    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
  },

  title_input: function(event){
    // console.log('title is', event.detail.value)
    this.setData({
      title: event.detail.value
    })
  },

  category_picker: function(event){
    this.setData({
      category_selection_index: event.detail.value
    })
  },

  location_picker: function(event){
    this.setData({
      location_selection_index: event.detail.value
    })
  },

  date_picker: function(event){
    // console.log('date is', event.detail.value)
    this.setData({
      date: event.detail.value
    })
  },

  chooseImage: function(event){
    wx.chooseImage({
      count: 4,
      sizeType : ['original', 'compressed'],
      sourceType : ['album', 'camera'],
      success : res => {
        this.setData({image_urls : []})
        const image_urls = this.data.image_urls.concat(res.tempFilePaths);
        this.data.image_urls = image_urls.length <= 4 ? image_urls : image_urls.slice(0, 4) 
        this.setData({image_urls: image_urls})
      }
    })
  },

  handleInput(e) {
    let value = this.validateNumber(e.detail.value)
    this.setData({
      value
    })
  },

  validateNumber(val) {
    return val.replace(/\D/g, '')
  }

})
