const TestList = wx.cloud.database().collection('TextList')
let Path = null;

Page({
    //定义名称
    data: {
        Link: null,
        Name: null,
        Time: null,
        Size: null,
        AuthorName: null
    },

    onLoad: function(options) {
        //设定上一页面传参,并传参至data
        this.setData({
                Link: options.Link,
                Name: options.Name,
                Time: options.Time,
                Size: options.Size,
                AuthorName: options.Author
            })
            //全局链接
        Path = options.Link
            //传参至OpenText方法
        let that = this
        that.OpenText(Path = options.Link)
        wx.showToast({
            title: '正在打开...',
            duration: 2500,
            icon: 'none'
        });
    },
    //打开（需下载）文本
    OpenText() {
        //设定Path值（好像可以不用）
        this.setData({ Path })
            //下载文本
        wx.cloud.downloadFile({
            fileID: Path, // 文件云链接
            success: res => {
                //接收缓存文件路径res.tempFilePath并设定为FilePath
                const FilePath = res.tempFilePath
                    //在新开页面打开文件
                wx.openDocument({
                    filePath: FilePath,
                    success: function(res) {
                        console.log('打开文档成功', res)
                    },
                    fail() {
                        wx.showToast({
                            title: '打开失败,可能是内部错误',
                            icon: 'none'
                        })
                    }
                })
            },
            fail() {
                wx.showToast({
                    title: '打开失败,可能是内部错误',
                    icon: 'none'
                })
            }
        })
    },
    //文件下载
    Download() {
        //跳转至下载页面 传参Path(云链接)
        wx.navigateTo({
            url: '/pages/download/download?Path=' + Path
        });
    }
})