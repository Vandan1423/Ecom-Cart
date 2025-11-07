import CartDetails from "./CartDetails";
import CartItemCard from "./CartItemCard";
import Checkout from "./Checkout";
import Loader from "../../components/Loader/Loader";
import { useState, useEffect } from "react";
import "../../styles/Cart/Cart.css";
import useToast from "../../components/Toast/ToastContext.jsx";

export default function Cart() {
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showCheckout, setShowCheckout] = useState(false);
    const { showToast } = useToast();

    useEffect(() => {
        fetchCartData();
    }, []);

    const fetchCartData = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:3000/api/cart");
            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data?.error || response.statusText);
            }
            const data = await response.json();
            setCartData(data.cart);
            setTotalPrice(data.totalPrice);
        } catch (error) {
            showToast({
                type: "error",
                title: "Failed to Load Cart",
                message: error.message || "An error occurred",
            });
        } finally {
            setLoading(false);
        }
    };

    const changeTotalPrice = (newTotalPrice) => {
        setTotalPrice(newTotalPrice);
    };

    const removeItemFromCart = (itemId) => {
        setCartData((prevCartData) => ({
            ...prevCartData,
            items: prevCartData.items.filter((item) => item._id !== itemId),
        }));
    };

    const handleCheckoutClick = () => {
        setShowCheckout(true);
    };

    const handleCloseCheckout = async () => {
        setShowCheckout(false);
    };

    const handleConfirmOrder = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/cart/${cartData._id}`,
                { method: "DELETE" }
            );
            const data = await response.json();
            if (response.ok && data.success) {
                setCartData({ items: [] });
                setTotalPrice(0);
            } else {
                showToast({
                    type: "error",
                    title: "Failed to Clear Cart",
                    message: data?.error || "Unknown error",
                });
            }
        } catch (error) {
            showToast({
                type: "error",
                title: "Network Error",
                message: error.message || "Unable to clear cart",
            });
        }
    };

    if (loading) {
        return <Loader text="Loading Cart Data..." />;
    }

    return (
        <>
            <div className="cart-container">
                <div className="cart-header">
                    <h1>Shopping Cart</h1>
                    <p className="cart-count">
                        {cartData.items?.length || 0} items
                    </p>
                </div>
                {cartData.items && cartData.items.length > 0 ? (
                    <div className="cart-content">
                        <div className="cart-items-section">
                            {cartData.items.map((item) => (
                                <CartItemCard
                                    key={item._id}
                                    item={item}
                                    cartId={cartData._id}
                                    changeTotalPrice={changeTotalPrice}
                                    totalPrice={totalPrice}
                                    onRemove={removeItemFromCart}
                                />
                            ))}
                        </div>
                        <CartDetails
                            totalPrice={totalPrice}
                            onCheckoutClick={handleCheckoutClick}
                        />
                    </div>
                ) : (
                    <div className="empty-cart">
                        <p>Your cart is empty</p>
                    </div>
                )}
            </div>

            <Checkout
                isOpen={showCheckout}
                onClose={handleCloseCheckout}
                cartItems={cartData.items || []}
                totalPrice={totalPrice}
                onConfirm={handleConfirmOrder}
            />
        </>
    );
}
