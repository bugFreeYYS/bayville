//index.js
Page({
  data:{
    title: '',
    date: '',
    category_list : ["Textbook", "Electronics", "Furniture", "Cosmetics"],
    category_selection_index:0,
    location_list : ["Utown", "Science", "FASS", "SOC"],
    location_selection_index:0,
    image_urls : [],
    image_urls_cloud: []
  },
  
  onLoad: function(){
  },

  uploadImages: function(){
    var image_urls = this.data.image_urls;
    var image;
    for (image of image_urls){
      var cloud_path = "posts/".concat(image.split('/')[3]);
      wx.cloud.uploadFile({
        cloudPath: cloud_path,
        filePath: image,
        success : res => {
          this.setData({image_urls_cloud : []})
          const image_urls_cloud = this.data.image_urls_cloud.concat(res.fieldID);
          this.data.image_urls_cloud = image_urls_cloud.length <= 4 ? image_urls_cloud : image_urls_cloud.slice(0, 4) 
          this.setData({image_urls_cloud: image_urls_cloud})
        }
      })
    }
  },

  postSell: function(event){
    this.uploadImages()
    console.log(this.data.image_urls);
    wx.cloud.callFunction({
      name: "postSell",
      data: {
        title: event.detail.value.title,
        price:  event.detail.value.price,
        description: event.detail.value.description,
        contact: event.detail.value.contact,
        category:  event.detail.value.category,
        location:  event.detail.value.location,
        transaction_date:event.detail.value.transaction_date,
        image_urls : this.data.image_urls

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
 
    })
  },

  title_input: function(event){
    // console.log('title is', event.detail.value)
    this.setData({
      title: event.detail.value
    })
  },

  category_picker: function(event){
    // console.log('category is', event.detail.value)
    this.setData({
      category_selection_index: event.detail.value
    })
  },

  location_picker: function(event){
    this.setData({
      location_selection_index: event.detail.value
    })
  },

  title_input: function(event){
    // console.log('title is', event.detail.value)
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
