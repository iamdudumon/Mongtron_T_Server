var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../model/User");

/* GET users listing. */
router.get("/email/:email", async function (req, res, next) {
  const email = req.params.email;
  const emailExist = await User.checkEmail(email);

  if (emailExist) res.sendStatus(409);
  else res.sendStatus(200);
});

router.post("/login", async function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.getUser(email, password);

  // email이 틀리거나, 비밀번호가 틀릴 시
  if (user == [] || !bcrypt.compareSync(password, user[0].password)) {
    res.sendStatus(401);
  } else {
    delete user[0].password;
    res.status(200).json(user[0]);
  }
});

module.exports = router;
