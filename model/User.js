const db = require("../util/db");

async function checkEmail(email) {
  const sql = "select count(*) count from user where email = ?";
  const result = await db.query(sql, [email]);

  if (result[0].count == 1) {
    //서버내 해당 이메일 존재 -> 다른 이메일로 회원가입 진행
    return true;
  } else {
    return false;
  }
}

async function getUser(email) {
  const sql =
    "select id, email, password, nickname, age, sex, user.nationality, embassyNum from user RIGHT OUTER JOIN nationality ON user.nationality = nationality.nationality where email = ?";
  const user = await db.query(sql, [email]);

  return user;
}

async function checkNickname(nickname) {
  const sql = "select count(*) count from user where nickname = ?";
  const result = await db.query(sql, [nickname]);

  if (result[0].count == 1) {
    //서버내 해당 이메일 존재 -> 다른 이메일로 회원가입 진행
    return true;
  } else {
    return false;
  }
}

async function insertUser(
  email,
  hashedPassword,
  nickname,
  age,
  sex,
  nationality
) {
  const sql =
    "insert into user (email, password, nickname, age, sex, nationality, gpsState) values(?, ?, ?, ?, ?, ?, ?)";

  try {
    await db.query(sql, [
      email,
      hashedPassword,
      nickname,
      age,
      sex,
      nationality,
      "0",
    ]);
    return true;
  } catch (error) {
    return false;
  }
}

async function updateGpsCoordinate(id, latitude, longitude) {
  const sql = "update user set latitude =? , longitude = ? where id = ?";

  try {
    await db.query(sql, [id, latitude, longitude]);
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  checkEmail,
  getUser,
  checkNickname,
  insertUser,
  updateGpsCoordinate,
};
