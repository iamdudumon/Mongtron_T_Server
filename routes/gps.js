var express = require("express");
var router = express.Router();

const User = require("../service/User");

router.patch("/", async (req, res, next) => {
  const id = req.body.id;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const radiusInfo = req.body.radiusInfo;

  const result = await User.updateGpsCoordinate(
    id,
    latitude,
    longitude,
    radiusInfo
  );

  if (result) res.sendStatus(200);
  else res.sendStatus(503);
});

module.exports = router;
