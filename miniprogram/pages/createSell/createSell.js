//index.js
Page({
  data: {
    title: '',
    date: '请选择',
    category_list: ["请选择", "Textbook", "Electronics", "Furniture", "Cosmetics"],
    category_selection_index: 0,
    location_list: ["请选择", "Utown", "Science", "FASS", "SOC"],
    location_selection_index: 0,
    image_urls: [],
    image_urls_cloud: []
  },

  onLoad: function () {},

  async uploadImages() {
    var that = this;
    var image_urls = this.data.image_urls;
    var image;
    this.setData({
      image_urls_cloud: []
    })
    for (image of image_urls) {
      var cloud_path = "posts/".concat(image.split('/')[3]);
      await wx.cloud.uploadFile({
        cloudPath: cloud_path,
        filePath: image,
      }).then(res => {
        const image_urls_cloud = that.data.image_urls_cloud.concat(res.fileID);
        that.setData({
          image_urls_cloud: image_urls_cloud
        });
      })
    }
  },

  async postSell(event) {
    await this.uploadImages();
    wx.cloud.callFunction({
      name: "postSell",
      data: {
        title: event.detail.value.title,
        price: event.detail.value.price,
        description: event.detail.value.description,
        contact: event.detail.value.contact,
        category: event.detail.value.category,
        location: event.detail.value.location,
        transaction_date: event.detail.value.transaction_date,
        image_urls: this.data.image_urls,
        image_urls_cloud: this.data.image_urls_cloud
      },
      success: (res) => {
        console.log('create success!');
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        });
        setTimeout(function () {
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }, 3000)
      }

    })
  },

  title_input: function (event) {
    this.setData({
      title: event.detail.value
    })
  },

  category_picker: function (event) {
    this.setData({
      category_selection_index: event.detail.value
    })
  },

  location_picker: function (event) {
    this.setData({
      location_selection_index: event.detail.value
    })
  },


  date_picker: function (event) {
    // console.log('date is', event.detail.value)
    this.setData({
      date: event.detail.value
    })
  },

  chooseImage: function (event) {
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        this.setData({
          image_urls: []
        })
        const image_urls = this.data.image_urls.concat(res.tempFilePaths);
        this.data.image_urls = image_urls.length <= 4 ? image_urls : image_urls.slice(0, 4)
        this.setData({
          image_urls: image_urls
        })
      }
    })
  },

  handleInput(e) {
    let value = this.validateNumber(e.detail.value)
    this.setData({
      value
    })
  },
  validateNumber: function (val) {

    // console.log(this.validate(val));
    return this.validate(val) ? val : val.slice(0, -1);

  },

  validate: function (s) {
    var rgx = /^[0-9]+\.{0,1}[0-9]{0,2}$/;
    return s.match(rgx);
  }


})