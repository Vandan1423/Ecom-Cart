import { useState } from "react";
import useToast from "../../components/Toast/ToastContext.jsx";

export default function CartItemCard({
    item,
    cartId,
    changeTotalPrice,
    totalPrice,
    onRemove,
    onQuantityChange,
}) {
    const [qty, setQty] = useState(item.qty);
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useToast();

    const handleIncrease = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `http://localhost:3000/api/cart/${cartId}/${item._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        qty: qty + 1,
                    }),
                }
            );
            const data = await response.json();
            if (response.ok && data.success) {
                setQty(qty + 1);
                changeTotalPrice(totalPrice + item.productId.price);
                onQuantityChange(item._id, qty + 1); // Update parent state
            } else {
                showToast({
                    type: "error",
                    title: "Update Failed",
                    message: data?.error || "Could not increase quantity",
                });
            }
        } catch (error) {
            showToast({
                type: "error",
                title: "Network Error",
                message: error.message || "Unable to update quantity",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDecrease = async () => {
        if (qty <= 1) {
            handleRemove();
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(
                `http://localhost:3000/api/cart/${cartId}/${item._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        qty: qty - 1,
                    }),
                }
            );
            const data = await response.json();
            if (response.ok && data.success) {
                setQty(qty - 1);
                changeTotalPrice(totalPrice - item.productId.price);
                onQuantityChange(item._id, qty - 1); // Update parent state
            } else {
                showToast({
                    type: "error",
                    title: "Update Failed",
                    message: data?.error || "Could not decrease quantity",
                });
            }
        } catch (error) {
            showToast({
                type: "error",
                title: "Network Error",
                message: error.message || "Unable to update quantity",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemove = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `http://localhost:3000/api/cart/${cartId}/${item._id}`,
                {
                    method: "DELETE",
                }
            );
            const data = await response.json();
            if (response.ok && data.success) {
                changeTotalPrice(totalPrice - item.productId.price * qty);
                onRemove(item._id);
                showToast({
                    type: "success",
                    title: "Item Removed",
                    message: `${item.productId.title} removed from cart`,
                });
            } else {
                showToast({
                    type: "error",
                    title: "Remove Failed",
                    message: data?.error || "Unable to remove item",
                });
            }
        } catch (error) {
            showToast({
                type: "error",
                title: "Network Error",
                message: error.message || "Unable to remove item",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="cart-item-card">
            <div className="item-image">
                <img src={item.productId.image} alt={item.productId.title} />
            </div>
            <div className="item-details">
                <h3 className="item-title">{item.productId.title}</h3>
                <p className="item-price">${item.productId.price}</p>
                <div className="quantity-controls">
                    <button
                        className="qty-btn"
                        onClick={handleDecrease}
                        disabled={isLoading}
                    >
                        −
                    </button>
                    <span className="quantity-display">{qty}</span>
                    <button
                        className="qty-btn"
                        onClick={handleIncrease}
                        disabled={isLoading}
                    >
                        +
                    </button>
                </div>
            </div>
            <div className="item-actions">
                <div className="item-subtotal">
                    <p>${(item.productId.price * qty).toFixed(2)}</p>
                </div>
                <button
                    className="remove-btn"
                    disabled={isLoading}
                    title="Remove from cart"
                    onClick={handleRemove}
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
