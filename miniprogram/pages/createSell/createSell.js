//index.js
Page({
  data:{
    title: '',
    category_list : ["Textbook", "Electronics", "Furniture", "Cosmetics"],
    category_selection_index:0,
    location_list : ["Utown", "Science", "FASS", "SOC"],
    location_selection_index:0,
    images : []
  },
  
  onLoad: function(){
  },

  uploadImages: function(){
    var images = this.data.images;
    var image;
    for (image of images){
      
      // console.log(image.split('/')[3]);
      var cloud_path = "posts/".concat(image.split('/')[3]);
      wx.cloud.uploadFile({
        cloudPath: cloud_path,
        filePath: image,
        success : res => {
          console.log("uploaded", res)
        }
        })
    }
  },

  postSell: function(event){
    this.uploadImages()
    wx.cloud.callFunction({
      name: "postSell",
      data: {
        title: event.detail.value.title,
        price:  event.detail.value.price,
        description: event.detail.value.description,
        contact: event.detail.value.contact,
        category:  event.detail.value.category,
        location:  event.detail.value.location,
        transaction_date:event.detail.value.transaction_date
      },
      success: (res) => {
        console.log('create success!');
        wx.navigateTo({
          url: '/pages/index/index',
        });
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

  chooseImage(event){
    wx.chooseImage({
      count: 4,
      sizeType : ['original', 'compressed'],
      sourceType : ['album', 'camera'],
      success : res => {
        this.setData({images : []})
        const images = this.data.images.concat(res.tempFilePaths);
        this.data.images = images.length <= 4 ? images : images.slice(0, 4) 
        this.setData({images: images})
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
