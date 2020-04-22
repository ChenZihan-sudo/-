let Access = null;
let OutPath = null;
let Path = null;
let appid = null;
let secret = null;

Page({
    data: {
        OutPath: "加载中...",
        hidden: true
    },
    onLoad: function(options) {
        Path = options.Path

        //换取真实链接
        wx.cloud.getTempFileURL({
            fileList: [Path],
            success: res => {
                console.log(res.fileList[0].tempFileURL)
                OutPath = res.fileList[0].tempFileURL
                this.setData({
                    OutPath: res.fileList[0].tempFileURL,
                    hidden: false
                })
            },
            fail: err => {
                wx.showToast({
                    title: '请求失败',
                    icon: 'none'
                });
            }
        })

    },
    //复制链接至粘贴板
    CopyOutPath() {
        wx.setClipboardData({
            data: OutPath,
            success() {
                wx.getClipboardData({
                    success(res) {
                        wx.showToast({
                            title: '复制好了,喵~',
                            icon: 'none'
                        });
                        console.log(res.data)
                    }
                })
            }
        })
        console.log(OutPath)
    }
})