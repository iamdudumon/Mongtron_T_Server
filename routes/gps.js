var express = require("express");
var router = express.Router();

const User = require("../service/User");
const Gps = require("../service/Gps");

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

  if (result) res.sendStatus(200);
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
  let list = [];

  others.forEach((row) => {
    let response = new Object();
    response.id = row.id;
    response.nickName = row.nickName;
    response.age = row.age;
    response.sex = row.sex == "male" ? "1" : "2";
    response.gpsState = row.gpsState == "1" ? true : false;
    response.latitude = row.latitude;
    response.longitude = row.longitude;
    response.distance = row.distance;
    list.push(response);
  });

  res.status(200).json({ users: list, length: others.length });
});

router.patch("/state/:id", async (req, res) => {
  const id = req.params.id;
  const gpsState = req.body.gpsState == "true" ? "1" : "0";

  const result = await Gps.updateGpsState(id, gpsState);

  if (result) res.sendStatus(200);
  else res.sendStatus(503);
});

module.exports = router;
