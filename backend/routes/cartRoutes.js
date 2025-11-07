const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const wrapAsync = require("../utils/wrapAsync");

router
    .route("/")
    .get(wrapAsync(cartController.getCart))
    .post(wrapAsync(cartController.addItemToCart));

router
    .route("/:cartId/:itemId")
    .patch(wrapAsync(cartController.updateCartItem))
    .delete(wrapAsync(cartController.deleteCartItem));

router.route("/:cartId").delete(wrapAsync(cartController.clearCart));

module.exports = router;
