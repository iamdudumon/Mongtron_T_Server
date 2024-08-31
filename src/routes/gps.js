var express = require("express");
var router = express.Router();

const User = require("../repositories/User");
const Gps = require("../repositories/Gps");

router.patch("/:id", async (req, res, next) => {
	const id = req.params.id;
	const latitude = req.body.latitude;
	const longitude = req.body.longitude;
	const radiusInfo = req.body.radiusInfo;

	const result = await Gps.updateGpsCoordinate(
		id,
		latitude,
		longitude,
		radiusInfo
	);

	if (result)
		res.status(200).json({
			message: "Success Location Udpate",
			data: {},
		});
	else res.sendStatus(503);
});

router.get("/position", async (req, res, next) => {
	const id = req.query.id;
	const lat = req.query.latitude;
	const lon = req.query.longitude;
	const radiusInfo = req.query.radiusInfo;

	if (lat == undefined || lon == undefined || radiusInfo == undefined) {
		res.sendStatus(400);
	}

	const others = await Gps.getNearbyUsersLocation(id, lat, lon, radiusInfo);
	if (!others) res.sendStatus(400);

	let list = [];
	others.forEach((row) => {
		let response = new Object();
		response.id = row.id;
		response.nickName = row.nickName;
		response.age = row.age;
		response.sex = row.sex == "male" ? "1" : "2";
		response.gpsState = row.gpsState == "Y" ? true : false;
		response.latitude = row.latitude;
		response.longitude = row.longitude;
		response.distance = row.distance;
		list.push(response);
	});

	res.status(200).json({ users: list, length: others.length });
});

router.patch("/state/:id", async (req, res) => {
	const id = req.params.id;
	const gpsState = req.body.gpsState == "true" ? "Y" : "N";

	const result = await Gps.updateGpsState(id, gpsState);

	if (result)
		res.status(200).json({
			message: "Success Gps State Udpate",
			data: {},
		});
	else res.sendStatus(503);
});

module.exports = router;
