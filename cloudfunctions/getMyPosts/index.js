// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const my_id= wxContext.OPENID;
  return await db.collection("posts").where({seller_id:my_id}).get();
}