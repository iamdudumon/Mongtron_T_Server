const db = require("../utils/db");

async function updateLocationCoordinate(id, latitude, longitude) {
	const sql = `UPDATE user SET latitude =? , longitude = ? WHERE id = ?`;
	// const sql = "update user set location = POINT(?, ?) where id = ?";

	try {
		await db.query(sql, [id, longitude, latitude]);
		return true;
	} catch {
		return false;
	}
}

async function getNearbyUsersLocation(id, lat, lon, radiusInfo) {
	const sql = `
							SELECT	
									id, nickName, age, if(sex = '남성', '1', '2') as sex, gpsState, latitude, longitude, 
									(6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) 
									AS distance 
							FROM 
									user 
							WHERE 
									gpsState = 'Y' 
									AND id != ?
									AND latitude BETWEEN ? - (? / 111.1) AND ? + (? / 111.1) 
									AND longitude BETWEEN ? - (? / (111.1 * COS(RADIANS(?)))) AND ? + (? / (111.1 * COS(RADIANS(?)))) 
							HAVING distance < ?
							`;
	// const sql = `
	// 						SELECT
	// 									id,
	// 									nickName,
	// 									age,
	// 									sex,
	// 									gpsState,
	// 									longitude,
	// 									latitude,
	// 									ST_Distance_Sphere(
	// 											location,
	// 											ST_SRID(
	// 													POINT(?, ?),
	// 													4326
	// 											)
	// 									) / 1000 AS distance_km
	// 						FROM user
	// 						WHERE
	// 									gpsState = 'Y'
	// 									AND id != ?
	// 									AND ST_WITHIN(
	// 											location,
	// 											ST_BUFFER(
	// 													ST_SRID(
	// 															POINT(?, ?),
	// 															4326
	// 													),
	// 													?
	// 											)
	// 									)
	// 						`;

	try {
		const result = await db.query(sql, [
			lat,
			lon,
			lat,
			id,
			lat,
			radiusInfo,
			lat,
			radiusInfo,
			lon,
			radiusInfo,
			lat,
			lon,
			radiusInfo,
			lat,
			radiusInfo,
		]);
		// const others = await db.query(sql, [
		// 	lon,
		// 	lat,
		// 	id,
		// 	lon,
		// 	lat,
		// 	radiusInfo * 1000,
		// ]);
		return result;
	} catch (error) {
		console.error(error);
		return false;
	}
}

async function updateLocationState(id, gpsState) {
	const sql = `UPDATE user SET gpsState = ? WHERE id = ?`;

	try {
		await db.query(sql, [gpsState, id]);
		return true;
	} catch {
		return false;
	}
}

module.exports = {
	updateLocationCoordinate,
	getNearbyUsersLocation,
	updateLocationState,
};
