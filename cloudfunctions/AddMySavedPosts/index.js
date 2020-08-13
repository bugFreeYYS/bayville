// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  console.log(event.new_saved_posts);
  db.collection("users").doc(wxContext.OPENID).update({
    data:{
      saved_posts: event.new_saved_posts
      },
      success: function(res) {
        console.log(res.data)
      }
    });
}