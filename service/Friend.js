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

async function deleteFrined(myId, friendId) {
  const sql = "delete from friend where pre_id = ? and post_id = ?";

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
  deleteFrined,
};
