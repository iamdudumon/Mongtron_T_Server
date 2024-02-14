var express = require("express");
var router = express.Router();

const Friend = require("../service/Friend");

router.post("/", async (req, res, next) => {
  const { myId, friendId } = req.query;
  const result = await Friend.insertFriend(myId, friendId);

  if (result) res.sendStatus(200);
  else res.sendStatus(409);
});

module.exports = router;
