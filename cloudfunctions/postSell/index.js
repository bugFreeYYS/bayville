// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event.title)
  return await db.collection("posts").add({
    data: {
      title: event.title,
      category: event.category,
      location: event.location,
      // date: event.date
      price:event.price,
      description:event.description
    }
  })
}