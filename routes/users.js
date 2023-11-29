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

router.get("/nickname/:nickname", async function (req, res, next) {
  const nickname = req.params.nickname;
  const nicknameExist = await User.checkEmail(nickname);

  if (nicknameExist) res.sendStatus(409);
  else res.sendStatus(200);
});

router.post("/register", async function (req, res, nexet) {
  const email = req.body.email;
  const password = req.body.password;
  const nickname = req.body.nickname;
  const age = req.body.age;
  const sex =
    req.body.sex == "0" ? null : req.body.sex == "1" ? "male" : "female"; //성별을 입력 안 하면 null
  const nationality = req.body.nationality;

  //비밀번호 hashing
  const hashedPassword = bcrypt.hashSync(password, 10);

  const result = await User.insertUser(
    email,
    hashedPassword,
    nickname,
    age,
    sex,
    nationality
  );

  if (result) res.sendStatus(200);
  else res.sendStatus(409);
});

module.exports = router;
