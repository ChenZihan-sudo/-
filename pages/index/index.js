Page({
    data: {

    },
    //跳转至查询历史记录页面
    ToHistory() {
        wx.navigateTo({
            url: '/pages/history/history'
        });
    },
    //跳转至所有文本页面
    ToAllText() {
        wx.navigateTo({
            url: '/pages/AllText/AllText'
        });
    },
    //跳转至管理员页面
    ToAdmin() {
        wx.navigateTo({
            url: '/pages/admin/admin'
        });
    },
    onShareAppMessage: function() {
        return {
            title: 'WebJob',
            imageUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
            path: '/pages/index/index'
        }
    }
})