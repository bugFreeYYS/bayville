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
      var cloud_path = "posts/".concat(image);
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
        title: this.data.title,
        category: this.data.category_list[this.data.category_selection_index],
        location: this.data.location_list[this.data.location_selection_index],
        date: this.data.date
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
  }
})
