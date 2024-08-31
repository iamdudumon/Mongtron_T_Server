const db = require("../utils/db");

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

async function getFriendList(id, latitude, longitude) {
	const sql =
		"select id, nickName, sex, gpsState, " +
		"(6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance " +
		"from user where id in (select post_id from friend where pre_id = ?);";
	try {
		const friendList = await db.query(sql, [latitude, longitude, latitude, id]);
		return friendList;
	} catch (error) {
		console.lop(error);
		return false;
	}
}

module.exports = {
	insertFriend,
	deleteFrined,
	getFriendList,
};
