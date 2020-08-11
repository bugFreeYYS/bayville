// miniprogram/pages/seeItem/seeItem.js

var utils= require('../../utils/util.js');

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

    job: [],
    jobList: [],
    id: '',
    isClick: false,
    jobStorage: [],
    jobId: ''

  },

  onLoad: function (options) {
    
    wx.getStorage({
      key: 'posts',
      success (res) {
        console.log(res.data)
      }
    });
    var _this = this;
    var itemid = options.itemid;
    this.setData({
      itemid: itemid,
    })
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

  haveSave(e) {
    if (!this.data.isClick == true) {
     let jobData = this.data.jobStorage;
     jobData.push({
     jobid: jobData.length,
     id: this.data.job.id
     })
     wx.setStorageSync('jobData', jobData);//设置缓存
     wx.showToast({
     title: '已收藏',
     });
    } else {
     wx.showToast({
     title: '已取消收藏',
     });
    }
    this.setData({
     isClick: !this.data.isClick
    })
    }
})