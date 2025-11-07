export default function Receipt({ receiptData, handleClose, user }) {
    return (
        <>
            <div className="overlay-header">
                <h2>Order Confirmed!</h2>
                <button className="close-btn" onClick={handleClose}>
                    ×
                </button>
            </div>

            <div className="checkout-body">
                <div className="receipt-success">
                    <div className="success-icon">✓</div>
                    <p className="success-message">
                        Thank you for your order, {user.username}!
                    </p>
                </div>

                <div className="receipt-details">
                    <div className="receipt-info">
                        <p>
                            <strong>Order Number:</strong>
                            <span>{receiptData.orderNumber}</span>
                        </p>
                        <p>
                            <strong>Date:</strong>
                            <span>{receiptData.date}</span>
                        </p>
                        <p>
                            <strong>Time:</strong>
                            <span>{receiptData.time}</span>
                        </p>
                    </div>

                    <div className="customer-info">
                        <h3>Customer Details</h3>
                        <p>
                            <strong>Name:</strong> {user.username}
                        </p>
                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p>
                            <strong>Phone:</strong> {user.phone}
                        </p>
                    </div>

                    <div className="receipt-items">
                        <h3>Items Purchased</h3>
                        {receiptData.items.map((item, idx) => (
                            <div key={idx} className="receipt-item">
                                <div className="receipt-item-info">
                                    <span className="receipt-item-name">
                                        {item.name}
                                    </span>
                                    <span className="receipt-item-detail">
                                        {item.quantity} × $
                                        {item.price.toFixed(2)}
                                    </span>
                                </div>
                                <span className="receipt-item-total">
                                    ${item.subtotal.toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="receipt-totals">
                        <div className="receipt-line receipt-grand-total">
                            <span>Total Paid:</span>
                            <span>${receiptData.totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="overlay-footer">
                <button className="done-btn" onClick={handleClose}>
                    Done
                </button>
            </div>
        </>
    );
}
