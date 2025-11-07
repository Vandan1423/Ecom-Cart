import { useState } from "react";
import Loader from "../../components/Loader/Loader";
import Receipt from "./Receipt";
import "../../styles/Cart/Checkout.css";
import useToast from "../../components/Toast/ToastContext.jsx";

export default function Checkout({
    isOpen,
    onClose,
    cartItems,
    totalPrice,
    onConfirm,
}) {
    const [showReceipt, setShowReceipt] = useState(false);
    const [receiptData, setReceiptData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
    });
    const { showToast } = useToast();

    if (!isOpen) return null;

    const handleConfirmOrder = async () => {
        if (!user.username.trim() || !user.email.trim() || !user.phone.trim()) {
            showToast({
                type: "error",
                title: "Missing Information",
                message: "Please fill in name, email, and phone",
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
            showToast({
                type: "error",
                title: "Invalid Email",
                message: "Please enter a valid email address",
            });
            return;
        }

        try {
            setLoading(true);
            const response = await fetch("http://localhost:3000/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: cartItems,
                    totalPrice,
                    user,
                }),
            });
            const data = await response.json();
            if (response.ok && data.success) {
                setReceiptData(data);
                setShowReceipt(true);
                onConfirm();
                showToast({
                    type: "success",
                    title: "Order Placed",
                    message: `Order ${data.orderNumber} confirmed`,
                });
            } else {
                showToast({
                    type: "error",
                    title: "Checkout Failed",
                    message: data?.error || "Unable to place order",
                });
            }
        } catch (error) {
            showToast({
                type: "error",
                title: "Network Error",
                message: error.message || "Unable to place order",
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader text="Confirming Order..." />;

    const handleClose = () => {
        setShowReceipt(false);
        setReceiptData(null);
        onClose();
    };

    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="overlay-backdrop" onClick={handleClose}>
            <div
                className="overlay-content"
                onClick={(e) => e.stopPropagation()}
            >
                {!showReceipt ? (
                    <>
                        <div className="overlay-header">
                            <h2>Confirm Your Order</h2>
                            <button className="close-btn" onClick={handleClose}>
                                ×
                            </button>
                        </div>

                        <div className="checkout-form">
                            <h3>Customer Information</h3>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={user.username}
                                    onChange={handleInputChange}
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={user.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    value={user.phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter your phone number"
                                />
                            </div>
                        </div>

                        <div className="checkout-body">
                            <div className="order-items">
                                <h3>Order Items ({cartItems.length})</h3>
                                {cartItems.map((item) => (
                                    <div
                                        key={item._id}
                                        className="confirmation-item"
                                    >
                                        <img
                                            src={item.productId.image}
                                            alt={item.productId.title}
                                            className="confirmation-item-image"
                                        />
                                        <div className="confirmation-item-details">
                                            <p className="confirmation-item-title">
                                                {item.productId.title}
                                            </p>
                                            <p className="confirmation-item-qty">
                                                Quantity: {item.qty}
                                            </p>
                                        </div>
                                        <div className="confirmation-item-price">
                                            $
                                            {(
                                                item.productId.price * item.qty
                                            ).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="order-summary">
                                <div className="summary-line">
                                    <span>Subtotal:</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="summary-line">
                                    <span>Shipping:</span>
                                    <span className="free-text">Free</span>
                                </div>
                                <div className="summary-divider"></div>
                                <div className="summary-line grand-total">
                                    <span>Grand Total:</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="overlay-footer">
                            <button
                                className="cancel-btn"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="confirm-btn"
                                onClick={handleConfirmOrder}
                            >
                                Confirm Order
                            </button>
                        </div>
                    </>
                ) : (
                    <Receipt
                        receiptData={receiptData}
                        handleClose={handleClose}
                        user={user}
                    />
                )}
            </div>
        </div>
    );
}
