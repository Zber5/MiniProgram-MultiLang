//index.js
//获取应用实例
const app = getApp()
var i18n = require('../../i18n/i18n.js')
const _ = i18n._;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // switchLanguage 定义
  switchLanguage: function () {
    if (i18n.getLanguage() == 'zh_CN') {
      console.log('切换至英文');
      wx.setStorageSync('Language', 'en'); // 利用本地缓存存放用户中英文选项
    } else {
      console.log('切换至中文');
      wx.setStorageSync('Language', 'zh_CN');
    };
    wx.navigateTo({
      url: 'index',
    });
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // 登录页面切换中英文需要
    if (i18n.getLanguage() == 'zh_CN') {
      this.setData({
        language: 'English',
      })
    } else {
      this.setData({
        language: '中文',
      })
    };
    this.setData({
      _t: i18n._t(), //翻译
    });
    // 导航栏的内容的改法
    wx.setNavigationBarTitle({
      title: _('语言')
    });
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})