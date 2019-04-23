var express = require("express");
var router = express.Router();
var modelMain = require("../models/main");
/*
 * GET home page.
 */
router.get("/myrequests/:id", modelMain.myrequests);


module.exports = router;
