var QQMapWX = require('../../js/qqmap-wx-jssdk.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classArray:['今日推荐','所有果品','佳沛金果','招牌推荐','现切水果','强势新品','休闲果干','热带水果','苹果例子','菩提浆果','芒橙柑柚','西瓜蜜瓜','果篮礼盒'],
    goodsItems:[
      {
        goodsImg:'../../images/apple.png',
        name:'[9折]B级-进口车厘子超甜超级好吃的车厘子',
        small_details:'1份/约250克[此商品优惠不与其他优惠券叠加]',
        price:'40.5',
        oldPrice:'80'
      },
      {
        goodsImg: '../../images/apple.png',
        name: '[9折]B级-进口车厘子超甜超级好吃的车厘子',
        small_details: '1份/约250克[此商品优惠不与其他优惠券叠加]',
        price: '40.5',
        oldPrice: '80'
      },
      {
        goodsImg: '../../images/apple.png',
        name: '[9折]B级-进口车厘子超甜超级好吃的车厘子',
        small_details: '1份/约250克[此商品优惠不与其他优惠券叠加]',
        price: '40.5',
        oldPrice: '80'
      }, 
      {
        goodsImg: '../../images/apple.png',
        name: '[9折]B级-进口车厘子超甜超级好吃的车厘子',
        small_details: '1份/约250克[此商品优惠不与其他优惠券叠加]',
        price: '40.5',
        oldPrice: '80'
      }
    ],
    locationaddr:''
  },
  selectAddr:function(){
    wx.setStorage({
      key: 'locationAddr',
      data: this.data.locationaddr,
    })
    wx.navigateTo({
      url: '../addr/addr',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  showAddr(){
    var appInstance = getApp();
    console.log(appInstance.addr);
    var that = this;
    if (!appInstance.addr) {

      // 实例化腾讯地图API核心类
      var qqmapsdk = new QQMapWX({
        key: '64LBZ-P4S64-7GVUG-X7LCU-UL7BS-C3BY7' // 必填
      });
      //1、获取当前位置坐标
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          console.log(res);
          //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success: function (res) {
              console.log(res.result.address);
              console.log(res);
              that.setData({
                locationaddr: res.result.address
              })
            },
            fail: function (res) {
              console.log(res);
            }
          });
        }
      })
    } else {
      this.setData({
        locationaddr: appInstance.addr
      })
    }
  },
  onLoad: function () {
    this.showAddr()
    
      

  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data.goodsItems);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(123);
    this.showAddr();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
