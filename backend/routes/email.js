const express = require("express");
const router=express.Router();
// const { userById } = require("../controller/user");

const {emailport} = require("../controller/email");
router.post("/email",emailport);


// router.param("userId", userById);
module.exports = router;