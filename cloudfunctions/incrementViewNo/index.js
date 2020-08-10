// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async ( event, context) => {
  const wxContext = cloud.getWXContext();
  // console.log(event.cur_views);
  var views = new Set(event.cur_views);
  console.log(views)
  views.add(wxContext.OPENID)
  return await db.collection("posts").doc(event.itemid).update({
    data:{
      viewed_by: Array.from(views)
    }
  });
}