// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  
  var user = await db.collection("users").where({
    _id: wxContext.OPENID
  }).get();
  
  if (user.data.length == 0) {

    return await db.collection("users").add({
      data: {
        nickname: event.nickname,
        gender: event.gender,
        _id: wxContext.OPENID,

      }
    })
  } else {
    try {
      return await db.collection('users').doc(wxContext.OPENID).update({
        data: {
          nickname: event.nickname,
          gender: event.gender
        }
      })
    } catch (e) {
      console.error(e)
    }
  }


}