var express = require("express");
var router = express.Router();

const User = require("../model/User");

/* GET users listing. */
router.get("/email/:email", async function (req, res, next) {
  const email = req.params.email;
  const emailExist = await User.getEmail(email);

  if (emailExist) res.sendStatus(409);
  else res.sendStatus(200);
});

module.exports = router;
