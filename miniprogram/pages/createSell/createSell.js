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
        category: this.data.category_list[this.data.category_selection_index]
      },
      success: (res) => {
        wx.navigateTo({
          url: '/pages/index/index',
        })
      }
    })
  },
  category_picker: function(event){
    console.log('category is', event.detail.value)
    this.setData({
      category_selection_index: event.detail.value
    })
  },
  title_input: function(event){
    console.log('title is', event.detail.value)
    this.setData({
      title: event.detail.value
    })
  },
  date_input: function(event){
    console.log('date is', event.detail.value)
  }
})
