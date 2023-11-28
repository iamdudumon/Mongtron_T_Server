const db = require("../util/db");

async function getEmail(email) {
  const sql = "select count(*) count from user where email = ?";
  const result = await db.query(sql, [email]);

  if (result[0].count == 1) {
    //서버내 해당 이메일 존재 -> 다른 이메일로 회원가입 진행
    return true;
  } else {
    return false;
  }
}

module.exports = { getEmail };
