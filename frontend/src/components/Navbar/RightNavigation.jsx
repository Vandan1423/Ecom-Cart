import { Link } from "react-router-dom";

export default function RightNavigation() {
    return (
        <div className="right-nav">
            <Link to="/cart" style={{ textDecoration: "none" }}>
                <button className="cart-button">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span>Cart</span>
                </button>
            </Link>
        </div>
    );
}
