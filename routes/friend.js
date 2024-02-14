var express = require("express");
var router = express.Router();

const Friend = require("../service/Friend");

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

router.get("/", async (req, res, next) => {
  const { id, latitude, longitude } = req.query;
});

module.exports = router;
