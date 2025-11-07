const Joi = require("joi");

const productValidationSchema = Joi.object({
    title: Joi.string().trim().min(3).max(200).required().messages({
        "string.empty": "Title is required",
        "string.min": "Title must be at least 3 characters long",
        "string.max": "Title cannot exceed 200 characters",
        "any.required": "Title is required",
    }),

    price: Joi.number().positive().precision(2).required().messages({
        "number.base": "Price must be a valid number",
        "number.positive": "Price must be a positive number",
        "any.required": "Price is required",
    }),

    description: Joi.string().trim().min(10).max(2000).required().messages({
        "string.empty": "Description is required",
        "string.min": "Description must be at least 10 characters long",
        "string.max": "Description cannot exceed 2000 characters",
        "any.required": "Description is required",
    }),

    category: Joi.string().trim().min(2).max(100).required().messages({
        "string.empty": "Category is required",
        "string.min": "Category must be at least 2 characters long",
        "string.max": "Category cannot exceed 100 characters",
        "any.required": "Category is required",
    }),

    image: Joi.string().trim().uri().required().messages({
        "string.empty": "Image URL is required",
        "string.uri": "Image must be a valid URL",
        "any.required": "Image URL is required",
    }),
});

const addItemToCartSchema = Joi.object({
    productId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
            "string.empty": "Product ID is required",
            "string.pattern.base":
                "Product ID must be a valid MongoDB ObjectId",
            "any.required": "Product ID is required",
        }),

    quantity: Joi.number().integer().min(1).max(100).required().messages({
        "number.base": "Quantity must be a valid number",
        "number.integer": "Quantity must be a whole number",
        "number.min": "Quantity must be at least 1",
        "number.max": "Quantity cannot exceed 100",
        "any.required": "Quantity is required",
    }),
});

const updateCartItemSchema = Joi.object({
    qty: Joi.number().integer().min(1).max(100).required().messages({
        "number.base": "Quantity must be a valid number",
        "number.integer": "Quantity must be a whole number",
        "number.min": "Quantity must be at least 1",
        "number.max": "Quantity cannot exceed 100",
        "any.required": "Quantity is required",
    }),
});

const cartIdSchema = Joi.object({
    cartId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
            "string.empty": "Cart ID is required",
            "string.pattern.base": "Cart ID must be a valid MongoDB ObjectId",
            "any.required": "Cart ID is required",
        }),
});

const cartAndItemIdSchema = Joi.object({
    cartId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
            "string.empty": "Cart ID is required",
            "string.pattern.base": "Cart ID must be a valid MongoDB ObjectId",
            "any.required": "Cart ID is required",
        }),

    itemId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
            "string.empty": "Item ID is required",
            "string.pattern.base": "Item ID must be a valid MongoDB ObjectId",
            "any.required": "Item ID is required",
        }),
});

const validateProduct = (productData) => {
    return productValidationSchema.validate(productData, {
        abortEarly: false,
        stripUnknown: true,
    });
};

const validateAddItemToCart = (data) => {
    return addItemToCartSchema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
    });
};

const validateUpdateCartItem = (data) => {
    return updateCartItemSchema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
    });
};

const validateCartId = (params) => {
    return cartIdSchema.validate(params, {
        abortEarly: false,
    });
};

const validateCartAndItemId = (params) => {
    return cartAndItemIdSchema.validate(params, {
        abortEarly: false,
    });
};

module.exports = {
    productValidationSchema,
    validateProduct,
    addItemToCartSchema,
    updateCartItemSchema,
    cartIdSchema,
    cartAndItemIdSchema,
    validateAddItemToCart,
    validateUpdateCartItem,
    validateCartId,
    validateCartAndItemId,
};
