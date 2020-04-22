//计算文件大小
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
    let fileSizeByte = event.Size
    var fileSizeMsg = ""
    if (fileSizeByte < 1024) fileSizeMsg = "<1K"
    else if (fileSizeByte >= 1024 && fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(0) + "K";
    else if (fileSizeByte == 1048576) fileSizeMsg = "1M"
    else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(1) + "M";
    else fileSizeMsg = ">1GB";
    console.log(fileSizeMsg)
    return fileSizeMsg
}