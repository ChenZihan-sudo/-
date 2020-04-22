//原页面js
//SB腾讯不让接入,老子写了2小时，cao
// import { Request } from "../../Request/Request.js";
// import { DownRequest } from "../../Request/Request.js";
// Request({})
//     .then(result => {
//         let _appid = result.result.data.APPID
//         let _secret = result.result.data.AppSecret
//         String(_appid)
//         String(_secret)
//         appid = _appid
//         secret = _secret
//     })
//     .then(result => {
//         console.log(appid)
//         DownRequest({
//                 url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential',
//                 data: {
//                     "appid": appid,
//                     "secret": secret
//                 },
//                 header: {
//                     'content-type': 'application/json' //GET类型
//                 }
//             })
//             .then(reject => {

//             })
//             .then(result => {
//                 Access = result.data.access_token
//                 console.log(Access)
//             })
//             .then(result => {
//                 DownRequest({
//                         url: 'https://api.weixin.qq.com/tcb/batchdownloadfile?access_token=' + Access,
//                         method: "POST",
//                         data: {
//                             //请求数据 环境ID 文件列表+云链接+文件下载有效期
//                             "env": "dzls-storage",
//                             "file_list": [{
//                                 "fileid": Path,
//                                 "max_age": 7200 //默认下载时间最大两小时
//                             }]
//                         }
//                     })
//                     .then(result => {
//                         console.log(result.data.file_list[0].download_url)
//                         OutPath = result.data.file_list[0].download_url
//                         console.log(OutPath)
//                         this.setData({
//                             OutPath: result.data.file_list[0].download_url,
//                             hidden: false
//                         })
//                     })
//             })
//     })

//原封装好的请求js
//SB腾讯不让接入,老子写了2小时，cao
// //params为传递参数
// export const Request = (params) => {
//     return new Promise((resolve, reject) => {
//         wx.cloud.callFunction({
//             name: "GetAdmin",
//             ...params,
//             success: (result) => {
//                 resolve(result);
//             },
//             fail: (err) => {
//                 reject(err);
//             }
//         })
//     })
// }
// export const DownRequest = (params) => {
//     return new Promise((resolve, reject) => {
//         wx.request({
//             ...params,
//             success: (result) => {
//                 resolve(result);
//             },
//             fail: (err) => {
//                 reject(err);
//             }
//         })
//     })
// }

//非封装好的页面js请求
//SB腾讯
//已废除啦
// wx.request({
//     url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET',
//     data: {
//         "appid": "-",
//         "secret": "-"
//     },
//     header: {
//         'content-type': 'application/json' //GET类型
//     },
//     success: res => {
//         Access = res.data.access_token
//         console.log(Access)
//             //请求下载链接 注意类型为POST header为默认值 access_token为query string(放在链接中)
//         wx.request({
//             url: 'https://api.weixin.qq.com/tcb/batchdownloadfile?access_token=' + Access,
//             method: "POST",
//             data: {
//                 //请求数据 环境ID 文件列表+云链接+文件下载有效期
//                 "env": "dzls-storage",
//                 "file_list": [{
//                     "fileid": Path,
//                     "max_age": 7200 //默认下载时间最大两小时
//                 }]
//             },
//             //header为默认值的说...【黑人抬棺.png】
//             success: res => {
//                 this.setData({
//                     OutPath: res.data.file_list[0].download_url,
//                     hidden: false
//                 })
//                 OutPath = res.data.file_list[0].download_url
//                 console.log(OutPath)
//             }
//         })
//     },
//     fail(res) {
//         console.log(res, "请求失败")
//     }
// })

//title=Hello&id=123&user.id=1001&user.name=user1&tags.0.id=1&tags.0.name=tag1&tags.1.id=2&tags.1.name=tag2&tags.1.year=2018