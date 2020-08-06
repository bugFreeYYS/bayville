//index.js
Page({
  data:{
    title: '',
    category_list : ["Textbook", "Electronics", "Furniture", "Cosmetics"],
    category_selection_index:0,
    location_list : ["Utown", "Science", "FASS", "SOC"],
    location_selection_index:0,
  },
  onLoad: function(){
  },

  postSell: function(event){
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
  }
})
