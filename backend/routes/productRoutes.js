const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const wrapAsync = require("../utils/wrapAsync");

router.route("/").get(wrapAsync(productController.getProducts));
module.exports = router;
