//初始化云数据库database({env:'dzls-storage'})已经定义
const TestList = wx.cloud.database().collection('TextList')
let Tag = null;
Page({
    data: {
        TextList: [],
        Tags: [
            { TagName: "法规速递", id: 0 },
            { TagName: "民事", id: 1 },
            { TagName: "商事", id: 2 },
            { TagName: "刑事", id: 3 },
            { TagName: "行政", id: 4 }
        ]
    },
    Tags(e) {
        Tag = e.currentTarget.dataset.index
        wx.navigateTo({
            url: '/pages/Tags/Tags?Tag=' + Tag,
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });

    },
    //页面启动时获取文本列表
    onLoad: function() {
        wx.showToast({
            title: '加载中...',
            duration: 500,
            icon: 'none'
        });
        TestList.get({
            //注意成功回调请求success:res=>可传值至全局
            success: res => {
                //设定传数据
                console.log(res)
                this.setData({
                    TextList: res.data
                })
            },
            //失败提示
            fail: res => {
                console.log(res)
                wx.showToast({
                    title: '查询失败,请检查网络',
                    icon: 'none'
                });
            }
        })
    }
})