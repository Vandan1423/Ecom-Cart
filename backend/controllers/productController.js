const Product = require("../models/product");
const { validateProduct } = require("../Schema");

const fetchProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
};

const saveProducts = async (products) => {
    try {
        const validatedProducts = [];
        const validationErrors = [];

        for (let i = 0; i < products.length; i++) {
            const { error, value } = validateProduct(products[i]);

            if (error) {
                validationErrors.push({
                    productIndex: i,
                    productTitle: products[i].title || "Unknown",
                    errors: error.details.map((detail) => detail.message),
                });
            } else {
                validatedProducts.push(value);
            }
        }

        if (validatedProducts.length > 0) {
            await Product.deleteMany({});
            await Product.insertMany(validatedProducts);
            console.log(
                `${validatedProducts.length} products inserted successfully`
            );

            if (validationErrors.length > 0) {
                console.log(
                    `${validationErrors.length} products skipped due to validation errors`
                );
            }
        }

        return {
            saved: validatedProducts.length,
            failed: validationErrors.length,
            errors: validationErrors,
        };
    } catch (error) {
        console.error("Error saving products:", error);
        throw error;
    }
};

module.exports.getProducts = async (req, res) => {
    try {
        let products = await Product.find({});

        if (products.length === 0) {
            try {
                const fetchedProducts = await fetchProducts();
                await saveProducts(fetchedProducts);
                products = await Product.find({});
            } catch (error) {
                console.error("Error fetching/saving products:", error);
                return res.status(500).json({
                    error: "Failed to fetch products from API",
                    message: error.message,
                });
            }
        }

        res.status(200).json(products);
    } catch (error) {
        console.error("Error processing products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
