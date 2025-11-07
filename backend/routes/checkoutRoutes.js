const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");
const wrapAsync = require("../utils/wrapAsync");

router.route("/").post(wrapAsync(checkoutController.showReceipt));
module.exports = router;
