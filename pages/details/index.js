var app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
Page({
    data: {
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1200,
        shopppingDetails:''
    },

    onLoad: function(options) {

        var that = this
        
        // 商品详情
        wx.request({
            url: 'http://huanqiuxiaozhen.com/wemall/goods/inqgoods?id=' + options.id,
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                console.log(res.data.data);
                that.data.shopppingDetails = res.data.data;
                // console.log(shopppingDetails.id)
                var goodsPicsInfo = [];
                var goodsPicsObj = {};
                var goodspic = res.data.data.goodspics;
                var goodspics = goodspic.substring(0, goodspic.length - 1);
                var goodspicsArr = goodspics.split("#");
                for (var i = 0; i < goodspicsArr.length; i++) {
                    goodsPicsInfo.push({
                        "picurl": goodspicsArr[i]
                    });
                }
                that.setData({
                  shopppingDetails: res.data.data,
                    goodsPicsInfo: goodsPicsInfo
                })
                // 拿到富文本数据
                var article = res.data.data.detailinfo;
                WxParse.wxParse('article', 'html', article, that, 5);
            }
        })

    }
})
