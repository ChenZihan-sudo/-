const TextList = wx.cloud.database().collection('TextList')
let SearchInput = null;
let Length = null;

Page({
    data: {
        TextList: []
    },
    //获取用户输入的搜索内容
    SearchInput(e) {
        SearchInput = e.detail.value
        Length = e.detail.cursor
        console.log(SearchInput, Length)
    },
    //查询用户输入的内容
    SearchSubmit() {
        console.log(Length)
            //校检用户是否输入信息
        while (Length < 1) {
            wx.showToast({
                title: '你什么也没输入哦！',
                icon: 'none'
            });
            break;
        }
        if (Length > 0) {
            //正则表达式 搜索功能
            const db = wx.cloud.database()
            TextList
                .where({
                    Name: db.RegExp({
                        regexp: '.*' + SearchInput,
                        options: 'i'
                    })
                })
                .get({
                    //成功后传值至data
                    success: res => {
                        console.log(res)
                        this.setData({
                            TextList: res.data
                        })
                        if (res.data.length < 1) {
                            wx.showToast({
                                title: '没有搜到哦,尝试变更下搜索词',
                                icon: 'none'
                            })
                        }
                    },
                    //失败提示
                    fail() {
                        wx.showToast({
                            title: '搜索失败(；￣Д￣）',
                            icon: 'none'
                        })
                    }
                })
        }
    }
})