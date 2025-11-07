import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Cart from "./Cart/Cart";
import Navbar from "../components/Navbar/Navbar";

export default function Pages() {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </Router>
        </>
    );
}
