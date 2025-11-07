module.exports.showReceipt = async (req, res) => {
    const { items, totalPrice } = req.body;
    try {
        if (items.length == 0) {
            return res.status(400).json({
                success: false,
                error: "Cart is empty",
            });
        }
        const receipt = {
            success: true,
            orderNumber: `ORD-${Date.now()}`,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            items: items.map((item) => ({
                name: item.productId.title,
                price: item.productId.price,
                quantity: item.qty,
                subtotal: item.productId.price * item.qty,
            })),
            totalPrice,
            message: "Order placed successfully",
        };
        res.status(200).json(receipt);
    } catch (error) {
        console.error("Error processing checkout:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};
