const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError");

const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");

main()
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.error("Error connecting to database:", error);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/ecom-cart");
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

app.use((req, res, next) => {
    next(new ExpressError("Not Found", 404));
});

app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ success: false, error: message });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
