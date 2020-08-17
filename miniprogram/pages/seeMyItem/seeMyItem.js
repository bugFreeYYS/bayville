// miniprogram/pages/seeItem/seeItem.js

var utils= require('../../utils/util.js');

var me;
var animation;

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,

    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 100,

    imgwidth: 0,
    imgheight: 0,


  },

  onLoad: function (options) {
    
    var app= getApp();
    // console.log(app.globalData.user_infos);
   
    var _this = this;
    var itemid = options.itemid;

    this.setData({
      itemid: itemid,
    })

    let new_viewed_posts= Array(...new Set(app.globalData.user_infos.viewed_posts).add(itemid));
    wx.cloud.callFunction({
      name:"AddMyViewedPosts",
      data:{
        new_viewed_posts: new_viewed_posts
      },
      success: (res) =>{
        app.globalData.user_infos.viewed_posts= new_viewed_posts;
        console.log('added the item into my viewed posts');
      }
    });

    
		wx.getSystemInfo({
			success: function(res) {
				_this.setData({
					screenHeight: res.windowHeight,
					screenWidth: res.windowWidth,
				});
			}
		});

    wx.cloud.callFunction({
      name: 'getItemView',
      data: {
        itemid: itemid
      },
      success: (res) => {

        this.setData({
          item_info: res.result.data,
          converted_time: utils.getDateDiff(
            utils.getDateTimeStamp(res.result.data.date_created.split('.')[0])
          ),
          
        })

        wx.cloud.callFunction({
          name: 'getNickname',
          data: {
            openid: res.result.data.seller_id
          },
          success: (res2) => {
            this.setData({
              seller_info: res2.result.data
            })
          }
        })

      },

      fail: err => {
        console.log(err)
      }
      
    });
    // console.log(this.data);
  },

  imageLoad: function (e) {
    var _this = this;
    var $width = e.detail.width, //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height; //图片的真实宽高比例
    var viewWidth = _this.data.screenWidth, //设置图片显示宽度，
      viewHeight = viewWidth / ratio; //计算的高度值   
    this.setData({
      imgwidth: viewWidth*2,
      imgheight: viewHeight*2
    })
  },

  goToEdit: function(e){
    var itemid = e.currentTarget.dataset.itemid;
    
    
    wx.navigateTo({
      url: '/pages/editMyItem/editMyItem?itemid=' + itemid,
    })
  }





})