import { Link } from "react-router-dom";

export default function LeftNavigation() {
    return (
        <div className="left-nav">
            <Link to="/" style={{ textDecoration: "none" }}>
                <h1 className="logo">Ecom-Cart</h1>
            </Link>
            <ul className="nav-option-list">
                <li className="nav-option">
                    <Link
                        to="/"
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        Products
                    </Link>
                </li>
            </ul>
        </div>
    );
}
