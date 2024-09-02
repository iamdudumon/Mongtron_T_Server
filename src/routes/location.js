var express = require("express");
var router = express.Router();

const Gps = require("../repositories/Location");

router.patch("/:id/coordinate", async (req, res, next) => {
	const id = req.params.id;
	const latitude = req.body.latitude;
	const longitude = req.body.longitude;

	const result = await Gps.updateLocationCoordinate(id, latitude, longitude);

	if (result) res.sendStatus(204);
	else res.sendStatus(503);
});

router.get("/:id/nearby_users", async (req, res, next) => {
	const id = req.params.id;
	const lat = req.query.latitude;
	const lon = req.query.longitude;
	const radiusInfo = req.query.radiusInfo;

	if (lat == undefined || lon == undefined || radiusInfo == undefined)
		return res.sendStatus(400);

	const nearybyUsers = await Gps.getNearbyUsersLocation(
		id,
		lat,
		lon,
		radiusInfo
	);
	if (!nearybyUsers) res.sendStatus(400);

	res.status(200).json({
		message: "Get request is successful.",
		data: { users: nearybyUsers, length: nearybyUsers.length },
	});
});

router.patch("/id:/state", async (req, res) => {
	const id = req.params.id;
	const gpsState = req.body.gpsState == "true" ? "Y" : "N";

	const result = await Gps.updat(id, gpsState);

	if (result) res.sendStatus(204);
	else res.sendStatus(503);
});

module.exports = router;
