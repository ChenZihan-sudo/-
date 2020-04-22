const UserHistory = wx.cloud.database().collection('UserHistory')
let OpenID = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  openid(){
    //调用云函数
    wx.cloud.callFunction({
      name:"GetOpenID",
      success:res=> {
        //获取openid
        OpenID = res.result.openid
        console.log("OPENID:",OpenID)
        //检查是否在库中注册
        UserHistory.where({
          OpenID:OpenID
        })
        .get({
          success:res=>{
            console.log(res,res.data.length)
            //查询到未注册 =>注册
            if(res.data.length===0){
              wx.showToast({
                title: '你还未浏览过任何文本哦',
                icon: 'none'});
              UserHistory.add({
                data:{
                  OpenID:OpenID
                },
                success:res=>{
                  console.log("数据已添加",res)
                },
                fail:res=>{
                  console.log("数据添加失败",res)
                }
              })
            }
            //已注册账户显示历史记录
            else{
              wx.showToast({
                title: '正在查询',
                duration:1000,
                icon: 'none'});

            }
          },
          fail:res=>{}
        })
      },
      fail(res) {
        console.log("请求失败", res)
      }
    })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})