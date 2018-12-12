// miniprogram/pages/addr/addr.js
var QQMapWX = require('../../js/qqmap-wx-jssdk.min.js');
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nearAddr:['成都理想酒店','万通红墙国际','华夏银行'],
    locationAddr:'未获取到用户的地址',
    inputValue:'',
    isshow1:'block',
    isshow2:'none',
    tipsAddr:[]
  },
  selectCity(){
    wx.navigateTo({
      url: '../serviceCity/serviceCity',
    })
  },
  getInPutValue(e){
     var that=this;
     console.log(e);
      this.setData({
        inputValue: e.detail.value
      })
  
      // 实例化API核心类
      var qqmapwx = new QQMapWX({
        key: '64LBZ-P4S64-7GVUG-X7LCU-UL7BS-C3BY7' // 必填
      });

      // 调用接口
      qqmapwx.getSuggestion({
          keyword: this.data.inputValue,
          success: function (res) {
            console.log(res);
            that.setData({
              isshow1: 'none',
              isshow2: 'block',
              tipsAddr:res.data
            })
          },
          fail: function (res) {
            console.log(res);
          }
      });
  },
  setAddr(e){
    appInstance.addr = e.target.dataset.addr;
   wx.switchTab({
     url: '../index/index'
   })
    // wx.na({
    //   url: '../index/index',
    //   success: function(res) {
    //     console.log(e.target.dataset.addr);
    //     appInstance.addr = e.target.dataset.addr
    //   }
    // })
  },
  reGetLocal(){
    var that = this;
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
  },
  addNewAddr(){
    wx.navigateTo({
      url: '../loginMethod/loginMethod',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
        wx.getStorage({
          key: 'locationAddr',
          success: function(res) {
            that.setData({
              locationAddr:res.data
            })
          },
        })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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