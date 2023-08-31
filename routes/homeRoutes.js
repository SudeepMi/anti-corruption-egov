const express = require("express");
const scrapController = require("../controllers/scrapController");

const router = express.Router();

router
  .route("/all-ecommerce")
  .post(
    scrapController.scrapAmazon,
    scrapController.scrapEbay,
    scrapController.scrapSnapdeal,
  );

  router.route("/all-news").get(
    scrapController.onlineKhabarScrap,
    scrapController.newsScrap
  );

  router.route("/scrap-url").post(scrapController.scrapUrl);
  router.get("/download/static/:id", scrapController.makeZip);
  router.get("/get-notices",scrapController.GetNotices);
  router.get("/get-publication",scrapController.GetNoticesFromTI);
  router.get("/sting",scrapController.Sting);



// router
//   .route("/daraz")
//   .get(
//     scrapController.scrapDaraz,
//   );

module.exports = router;
