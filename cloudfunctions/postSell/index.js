// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var today = new Date();
  var date_expired = new Date();
  date_expired.setDate(today.getDate()+7);
  return await db.collection("posts").add({
    data: {
      title: event.title,
      price:event.price,
      category: event.category,
      description:event.description,
      location: event.location,
      concact_info: event.contact,
      
      transaction_date: event.date,
      date_created:today,
      date_modified:today,
      date_expiring: date_expired,
      
      seller_id:wxContext.OPENID,
      liked_by:new Set(),
      viewed_by: [], 
      
      image_urls : event.image_urls
    }
  })
}