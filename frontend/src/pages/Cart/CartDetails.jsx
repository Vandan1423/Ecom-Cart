export default function CartDetails({ totalPrice, onCheckoutClick }) {
    return (
        <div className="cart-details-card">
            <h2>Order Summary</h2>
            <div className="summary-section">
                <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                    <span>Shipping</span>
                    <span className="free-text">Free</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total-row">
                    <span>Total</span>
                    <span className="total-price">
                        ${totalPrice.toFixed(2)}
                    </span>
                </div>
            </div>
            <button className="checkout-btn" onClick={onCheckoutClick}>
                Proceed to Checkout
            </button>
        </div>
    );
}
