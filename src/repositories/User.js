const db = require("../utils/db");

async function getUserCountByEmail(email) {
	const sql = "select count(*) count from user where email = ?";
	const result = await db.query(sql, [email]);
	console.log(result);
	return result[0].count;
}

async function getUserCountByNickname(nickname) {
	const sql = "select count(*) count from user where nickname = ?";
	const result = await db.query(sql, [nickname]);

	return result[0].count;
}

async function getUserByEmail(email) {
	const sql =
		"select id, email, password, nickname, age, sex, user.nationality, embassyNum from user RIGHT OUTER JOIN nationality ON user.nationality = nationality.nationality where email = ?";
	const user = await db.query(sql, [email]);

	return user;
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

module.exports = {
	getUserCountByEmail,
	getUserCountByNickname,
	getUserByEmail,
	insertUser,
};
