var express = require("express");
var router = express.Router();

const Friend = require("../repositories/Friend");

router.post("/", async (req, res, next) => {
	const { my_id, friend_id } = req.body;
	const result = await Friend.insertFriend(my_id, friend_id);

	if (result) res.sendStatus(200);
	else res.sendStatus(400);
});

router.delete("/", async (req, res, next) => {
	const { my_id, friend_id } = req.query;

	const result = await Friend.deleteFrined(my_id, friend_id);

	if (result) res.sendStatus(200);
	else res.sendStatus(400);
});

router.get("/list", async (req, res, next) => {
	const { id, latitude, longitude } = req.query;

	if (latitude == undefined || longitude == undefined) {
		res.sendStatus(400);
	}

	const friendList = await Friend.getFriendList(id, latitude, longitude);
	if (friendList) {
		return res.status(200).json({
			addedFriendVOList: friendList.map((row) => ({
				friendId: row.id,
				friendNickName: row.nickName,
				friendSex: row.sex === "male" ? "1" : "2",
				friendGpsState: row.gpsState === "1",
				distance: row.gpsState === "1" ? row.distance : -1.0,
			})),
		});
	} else res.sendStatus(400);
});

module.exports = router;
