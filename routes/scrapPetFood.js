const express = require("express");
const {
  sastoDeal
} = require("../controllers/scrapController")

const router = express.Router();

router
  .route("/")
  .get(sastoDeal);

  
module.exports = router;
