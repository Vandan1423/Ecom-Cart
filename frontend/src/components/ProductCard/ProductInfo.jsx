import { useState } from "react";
import useToast from "../Toast/ToastContext.jsx";

export default function ProductInfo({ product }) {
    const [isAdded, setIsAdded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useToast();

    const handleAddToCart = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId: product._id,
                    quantity: 1,
                }),
            });

            if (response.ok) {
                setIsAdded(true);
                setTimeout(() => {
                    setIsAdded(false);
                }, 2000);
            } else {
                const data = await response.json().catch(() => ({}));
                showToast({
                    type: "error",
                    title: "Add to Cart Failed",
                    message: data?.error || response.statusText,
                });
            }
        } catch (error) {
            showToast({
                type: "error",
                title: "Network Error",
                message: error.message || "Unable to add to cart",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="product-info">
            <p className="product-category">{product.category}</p>
            <h3 className="product-name">{product.title}</h3>
            <div className="product-details">
                <p>{product.description}</p>
                <p className="product-price">{product.price.toFixed(2)}</p>
            </div>
            <button
                className={`add-to-cart-btn ${isAdded ? "added" : ""}`}
                onClick={handleAddToCart}
                disabled={isAdded || isLoading}
                aria-label={isAdded ? "Added to cart" : "Add to cart"}
            >
                {isLoading ? (
                    <>
                        <i className="fa-solid fa-spinner"></i>
                        <span>Adding...</span>
                    </>
                ) : isAdded ? (
                    <>
                        <i className="fa-solid fa-circle-check"></i>
                        <span>Added to Cart!</span>
                    </>
                ) : (
                    <>
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span>Add to Cart</span>
                    </>
                )}
            </button>
        </div>
    );
}
