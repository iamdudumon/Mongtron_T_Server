const mysql = require("mysql2/promise");
const config = require("../config");

const pool = mysql.createPool(config.mysql);

async function query(sql, params) {
	const conn = await pool.getConnection();
	const [rows] = await conn.query(sql, params);
	conn.release();
	return rows;
}

module.exports = { query };
