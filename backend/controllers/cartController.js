const Cart = require("../models/cart");
const {
    validateAddItemToCart,
    validateUpdateCartItem,
    validateCartId,
    validateCartAndItemId,
} = require("../Schema");

module.exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne().populate("items.productId");

        if (!cart || cart.items.length === 0) {
            return res.status(200).json({
                cart: cart || { items: [] },
                totalPrice: 0,
            });
        }

        const totalPrice = cart.items.reduce((acc, item) => {
            return acc + item.productId.price * item.qty;
        }, 0);

        res.status(200).json({ cart, totalPrice });
    } catch (error) {
        console.error("Error processing cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports.addItemToCart = async (req, res) => {
    try {
        const { error, value } = validateAddItemToCart(req.body);

        if (error) {
            const errorMessages = error.details.map((detail) => detail.message);
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errorMessages,
            });
        }

        const { productId, quantity } = value;
        let cart = await Cart.findOne();

        if (!cart) {
            cart = new Cart({ items: [{ productId, qty: quantity }] });
            await cart.save();
            await cart.populate("items.productId");
            return res.status(201).json({
                success: true,
                message: "Product added to cart",
                cart,
            });
        }

        const idx = cart.items.findIndex(
            (i) => String(i.productId) === productId
        );

        if (idx > -1) {
            cart.items[idx].qty += quantity;
        } else {
            cart.items.push({ productId, qty: quantity });
        }

        await cart.save();
        await cart.populate("items.productId");

        res.status(200).json({
            success: true,
            message: "Product added to cart",
            cart,
        });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};

module.exports.updateCartItem = async (req, res) => {
    try {
        const { error: paramError } = validateCartAndItemId(req.params);
        if (paramError) {
            const errorMessages = paramError.details.map(
                (detail) => detail.message
            );
            return res.status(400).json({
                success: false,
                message: "Invalid parameters",
                errors: errorMessages,
            });
        }

        const { error: bodyError, value } = validateUpdateCartItem(req.body);
        if (bodyError) {
            const errorMessages = bodyError.details.map(
                (detail) => detail.message
            );
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errorMessages,
            });
        }

        const { cartId, itemId } = req.params;
        const { qty } = value;

        const updatedCart = await Cart.findOneAndUpdate(
            { _id: cartId, "items._id": itemId },
            { $set: { "items.$.qty": qty } },
            { new: true }
        ).populate("items.productId");

        if (!updatedCart) {
            return res.status(404).json({
                success: false,
                error: "Cart or item not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Quantity updated",
            cart: updatedCart,
        });
    } catch (error) {
        console.error("Error updating cart item:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};

module.exports.deleteCartItem = async (req, res) => {
    try {
        const { error } = validateCartAndItemId(req.params);
        if (error) {
            const errorMessages = error.details.map((detail) => detail.message);
            return res.status(400).json({
                success: false,
                message: "Invalid parameters",
                errors: errorMessages,
            });
        }

        const { cartId, itemId } = req.params;

        const updatedCart = await Cart.findOneAndUpdate(
            { _id: cartId },
            { $pull: { items: { _id: itemId } } },
            { new: true }
        ).populate("items.productId");

        if (!updatedCart) {
            return res.status(404).json({
                success: false,
                error: "Cart not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Item removed from cart",
            cart: updatedCart,
        });
    } catch (error) {
        console.error("Error deleting cart item:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};

module.exports.clearCart = async (req, res) => {
    try {
        const { error } = validateCartId(req.params);
        if (error) {
            const errorMessages = error.details.map((detail) => detail.message);
            return res.status(400).json({
                success: false,
                message: "Invalid parameters",
                errors: errorMessages,
            });
        }

        const { cartId } = req.params;

        const clearedCart = await Cart.findOneAndUpdate(
            { _id: cartId },
            { $set: { items: [] } },
            { new: true }
        );

        if (!clearedCart) {
            return res.status(404).json({
                success: false,
                error: "Cart not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Cart cleared",
            cart: clearedCart,
        });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};
