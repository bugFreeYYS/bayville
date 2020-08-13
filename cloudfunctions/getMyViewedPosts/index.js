// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  // let posts=event.viewed_posts;
  event.viewed_posts.push('padding');
  console.log(event.viewed_posts);
  return await db.collection("posts").where({_id: _.in(event.viewed_posts)}).get();
}