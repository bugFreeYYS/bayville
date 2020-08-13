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

    isCollected:false,

    // collect: 0, imgurl:"/images/seeItem/collect.svg",
    collected: false, 
    imgurl:"/images/seeItem/collected.svg",

    animationdata:{}

  },

  onLoad: function (options) {
    
    var app= getApp();
    // console.log(app.globalData.user_infos);
    this.updatedata(options,app.globalData.user_infos);
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

        wx.cloud.callFunction({
          name:'incrementViewNo',
          data:{
            itemid: itemid,
            cur_views: this.data.item_info.viewed_by
          },
          success : (res) =>{
            // console.log('incremented view number');
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

  et_collection :function(){
    let app= getApp();
    let that=this;
    this.at_play();
    var new_saved_posts;
    // setTimeout(function(){
      
    // }, 800);

    if(!that.data.collected){
      new_saved_posts= Array(...new Set(app.globalData.user_infos.saved_posts).add(that.data.itemid)); 
    }else{
      new_saved_posts= new Set(app.globalData.user_infos.saved_posts)
      new_saved_posts.delete(that.data.itemid); 
      new_saved_posts= Array(...new_saved_posts);
    }

    console.log(new_saved_posts);
   
    wx.cloud.callFunction({
      name:"AddMySavedPosts",
      data:{
        new_saved_posts: new_saved_posts
      },
      success: (res) =>{
        var imgurl, collected;
        app.globalData.user_infos.saved_posts= new_saved_posts;
        console.log('added the item into my saved posts');
        
      if (that.data.collected){
        imgurl='/images/seeItem/collect.svg';
        collected=false;
       
      }else{
        imgurl='/images/seeItem/collected.svg';
        collected=true;
      }
      that.setData({
        imgurl:imgurl,
        collected:collected,
      });
        
        wx.showToast({
          title: that.data.collected?"收藏成功":"收藏取消",
          duration:1000,
          icon:"sucess",
          make:true
         });
         
      }
    });
  },

  at_play: function(){
    animation=wx.createAnimation({
      delay: 500,
    });
    animation.scale(0.2).step({duration:200});
    animation.scale(1).step({duration:200});
    this.setData({animationdata:animation.export()}); 
  },

  updatedata: function(options,userinfo){
    this.setData({
      collected: userinfo.saved_posts.includes(options.itemid),
      imgurl: userinfo.saved_posts.includes(options.itemid)?'/images/seeItem/collected.svg':'/images/seeItem/collect.svg'
    })
  }
})