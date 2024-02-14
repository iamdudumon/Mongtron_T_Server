const db = require("../util/db");

async function insertFriend(myId, friendId) {
  const sql = "insert into friend(pre_id, post_id) values(?, ?)";

  try {
    await db.query(sql, [myId, friendId]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  insertFriend,
};
