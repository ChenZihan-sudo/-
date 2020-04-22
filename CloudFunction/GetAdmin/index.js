// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async () => {
  return cloud.database().collection("AdminAccount").doc("d77a8c995e9c455b005a7ddf73934ea3").get();
}