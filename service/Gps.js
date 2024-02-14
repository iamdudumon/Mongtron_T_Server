const db = require("../util/db");

async function updateGpsCoordinate(id, latitude, longitude) {
  const sql = "update user set latitude =? , longitude = ? where id = ?";

  try {
    await db.query(sql, [id, latitude, longitude]);
    return true;
  } catch {
    return false;
  }
}

async function getNearbyUsersLocation(id, lat, lon, radiusInfo) {
  const sql =
    "SELECT " +
    "id, nickName, age, sex, gpsState, latitude, longitude," +
    "(6371 * acos ( cos ( radians(?) )" +
    "* cos( radians( latitude ) )" +
    "* cos( radians(longitude) - radians(?) )" +
    "+ sin ( radians(?) ) * sin( radians(latitude) )" +
    ")) AS distance " +
    "from user where gpsState = '1' and not id = ? having distance < ?";

  try {
    const others = await db.query(sql, [lat, lon, lat, id, radiusInfo]);
    return others;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function updateGpsState(id, gpsState) {
  const sql = "update user set gpsState = ? where id = ?";

  try {
    await db.query(sql, [gpsState, id]);
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  updateGpsCoordinate,
  getNearbyUsersLocation,
  updateGpsState,
};
