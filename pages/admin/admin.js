const util = require("../../utils/util.js");
//以下是全局注册内容
const Admin = wx.cloud.database().collection('AdminAccount')
const TextList = wx.cloud.database().collection('TextList')

let AdminAccount = null;
let AdminPassword = null;
let AdminAccountInput = null;
let UploadOkDisplay = null;

let AuthorName = null;
let SortTag = null;
let TimeStamp = null;
let Size = null;
let Name = null;
let CLink = null;
let DisplayTime = null;
let DPSize = null

Page({
        data: {
            //上传显示(四个)  =>真值不显示  =>假值显示
            UploadDisplay: true,
            UploadOkDisplay: true,
            CheckUpload: true,
            PreViewHidden: true,

            //在页面展示
            Author: null,
            Name: null,
            Path: null,
            Sort: null,
            Time: null,
            DisplayTime: null,

            //分类选项
            Radio: [{
                    RadioName: "法规速递"
                },
                {
                    RadioName: "民事"
                },
                {
                    RadioName: "刑事"
                },
                {
                    RadioName: "商事"
                },
                {
                    RadioName: "行政"
                }
            ],
        },
        //密码登录
        //获取管理员输入的账户
        AdminAccount(e) {
            AdminAccount = e.detail.value
            AdminAccountInput = e.detail.cursor
        },
        //获取管理员输入的密码
        AdminPassword(e) {
            AdminPassword = e.detail.value
        },
        //校检管理员账户和密码
        CheckAccount() {
            //查询有无管理员账号
            if (AdminAccountInput < 1) {
                wx.showToast({
                    title: '你还未填写账号哟！',
                    icon: 'none'
                });
                return
            }
            Admin.doc(AdminAccount).get({
                    //查询成功获取密码
                    success: res => {
                        console.log(res)
                        if (res.data.password === AdminPassword) {
                            wx.showToast({
                                title: '登录成功',
                                icon: 'none'
                            });
                            this.setData({
                                UploadDisplay: false
                            })
                        } else {
                            wx.showToast({
                                title: '账户或密码错误',
                                icon: 'none'
                            });
                        }
                    },
                    //查询失败(请检查网络)=>查询账户无效返回至成功
                    fail() {
                        wx.showToast({
                            title: '账号或密码错误',
                            icon: 'none'
                        });
                    }
                })
                //接受传参并设定

        },
        //上传文件至云存储
        //管理员先上传文件上传后  显示可更改项
        AuthorName(e) { //作者名称
            AuthorName = e.detail.value
                // this.setData({
                //   _Author:AuthorName,
                //   _Name:Name,
                //   _Path:CLink,
                //   _Sort:SortTag,
                //   _Time:TimeStamp,
                //   _DisplayTime:DisplayTime
                // })
        },
        SortTag(e) { //分类项  之后改为单选项
            SortTag = e.detail.value
            this.setData({
                Author: AuthorName,
                Name: Name,
                Path: CLink,
                Sort: SortTag,
                Time: TimeStamp,
                DisplayTime: DisplayTime
            })
        },
        UpLoad() {
            //选择文件获取文件缓存路径
            wx.chooseMessageFile({
                    count: 1, //上传数量
                    type: 'file', //上传类型
                    success(res) {
                        const tempFilePaths = res.tempFiles[0].path;
                        //缓存信息，最后传出！！！
                        const TempName = res.tempFiles[0].name;
                        const TempTimeStamp = Math.floor(new Date().getTime() / 1000);
                        const TempSize = res.tempFiles[0].size;
                        console.log(res)
                        wx.showToast({
                            title: '请等待上传完成',
                            duration: 2000,
                            icon: 'none'
                        });
                        //上传文件
                        wx.cloud.uploadFile({
                            cloudPath: '法律文本/' + TempName, // 上传至云端的路径(文件夹路径:'folder/'+filename)
                            filePath: tempFilePaths, // 小程序临时文件路径
                            success: res => {
                                //获取云链接(fileID)
                                console.log(res)
                                console.log(TempName, TempTimeStamp, TempSize)
                                wx.showToast({
                                    title: '上传成功,请填写下列选项',
                                    duration: 2000,
                                    icon: 'none'
                                });
                                //传出数据至全局
                                CLink = res.fileID
                                Name = TempName
                                TimeStamp = TempTimeStamp
                                Size = TempSize
                                console.log(CLink)
                                    //更改为显示表单
                                this.setData({
                                    UploadOkDisplay: false
                                })
                            },
                            fail: res => {
                                //上传失败不显示上传数据库标签
                                this.setData({
                                    UploadOkDisplay: true
                                })
                                wx.showToast({
                                    title: '上传失败,请检查网络',
                                    icon: 'none'
                                });
                            }
                        })
                    },
                    //上传失败不显示上传数据库标签
                    fail: res => {
                        wx.showToast({
                            title: '未选择文件,上传失败',
                            duration: 2500,
                            icon: 'none'
                        });
                        this.setData({
                            UploadOkDisplay: true
                        })
                    }
                })
                //最终还需设置显示模式
            this.setData({
                UploadOkDisplay
            })
        },
        Check() {
            //检查分类项是否填写
            if (SortTag === null) {
                wx.showToast({
                    title: '分类为必填项',
                    icon: 'none'
                });
                return;
            }
            this.setData({
                    CheckUpload: false,
                    Author: AuthorName,
                    Name: Name,
                    Path: CLink,
                    Sort: SortTag,
                    Time: TimeStamp,
                    DisplayTime: DisplayTime
                })
                //计算文件大小
            wx.cloud.callFunction({
                name: "GetSize",
                data: { Size },
                success: res => {
                    DPSize = res.result
                    console.log(DPSize)
                },
                fail(res) {
                    console.log("请求失败", res)
                }
            })
        },
        //更改名称
        NameInput(e) {
            Name = e.detail.value
                //设定显示更新输入
            this.setData({
                Name: Name
            })
        },
        //上传至数据库

        UpDB() {

            console.log(AuthorName, SortTag, TimeStamp, Size, Name, CLink, DisplayTime)
            console.log(DPSize)

            //添加数据
            TextList.add({
                data: {
                    Author: AuthorName,
                    Name: Name,
                    Path: CLink,
                    Sort: SortTag,
                    Time: TimeStamp,
                    DisplayTime: DisplayTime,
                    Size: DPSize
                },
                success: res => {
                    console.log("上传成功", res)
                    wx.showToast({
                        title: '上传成功',
                        icon: 'none'
                    });
                    this.setData({
                        PreViewHidden: false
                    })
                },
                fail: res => {
                    console.log("上传失败", res)
                }
            })
        },
        onLoad() {
            DisplayTime = util.formatDate(new Date());
        },
        //没有写预览哦！！！！[微笑]
        PreView() {
            wx.navigateTo({
                url: '/pages/details/details?Link=' + JSON.stringify(CLink)
            });
        }
    })
    //&'Name='+Name&'Author='+AuthorName&'Time='+TimeStamp