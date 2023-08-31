const express = require("express");
const publicController = require("../controllers/publicController");
const { checkKey, handleAPIcall } = require("../middleware/apiMiddleware");

const router = express.Router();

router.route("/news/bbc").get(checkKey, handleAPIcall, publicController.bbcScrap);
router.route("/news/nytimes").get(checkKey, handleAPIcall,publicController.newsScrap);
router.route("/news/onlinekhabar").get(checkKey, handleAPIcall,publicController.onlineKhabarScrap);
router.route("/ecom/amazon").get(checkKey, handleAPIcall,publicController.scrapAmazon);
router.route("/ecom/snapdeal").get(checkKey, handleAPIcall,publicController.scrapSnapdeal);
router.route("/ecom/ebay").get(checkKey, handleAPIcall,publicController.scrapEbay);
    

module.exports = router;
