// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise')
cloud.init()


// 云函数入口函数
exports.main = async(event, context) => {
    //传输域名
    path = event.Path;
    console.log(path)

    //获取appid和secret
    const save = await cloud.database().collection("AdminAccount").doc('d77a8c995e9c455b005a7ddf73934ea3').get();
    appid = save.data.APPID
    secret = save.data.AppSecret
    console.log(appid, secret)

    //获取access_token GET
    var AT = {
        uri: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential',
        qs: {
            "appid": appid,
            "secret": secret
        },
        headers: {
            'content-type': 'application/json'
        },
        json: true // Automatically parses the JSON string in the response
    };
    rp(AT)
        .then(function(res) {
            access = res.access_token
            console.log(access)
                //获取下载链接 
            const DL = {
                method: 'POST',
                uri: 'https://api.weixin.qq.com/tcb/batchdownloadfile?access_token=' + access & 'env="dzls-storage"&file_list.0.fileid=' + path,
                //string类型转换失败？
                body: {
                    //请求数据 环境ID 文件列表+云链接+文件下载有效期
                    "env": "dzls-storage",
                    "file_list": [{
                        "fileid": path,
                        "max_age": 7200 //默认下载时间最大两小时
                    }]
                },
                headers: {
                    'content-type': 'application/json'
                }
            };

            rp(DL)
                .then(function(res) {
                    console.log(res)
                })
                .catch(function(err) {
                    // POST failed...
                    console.log(err)
                });

        })
        .catch(function(err) {
            // API call failed...
            console.log(err)
        });

    // return { appid, secret }


    // .then
    // let url = 'https://baidu.com'
    // return await rp(url)
    //     .then(function(res) {
    //         console.log(res)
    //         return res
    //     })
    //     .catch(function(err) {
    //         return '失败'
    //     })
}

// const cloud = require('wx-server-sdk')
// cloud.init({
//     env: cloud.DYNAMIC_CURRENT_ENV
// })

// exports.main = async(event, context) => {
//     const fileList = ['cloud://dzls-storage.647a-dzls-storage-1301687797/法律文本/3.26晚测.pdf']
//     const result = await cloud.getTempFileURL({
//         fileList: fileList,
//     })
//     return result.fileList
// }