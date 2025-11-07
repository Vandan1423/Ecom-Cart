import ProductsGrid from "./ProductsGrid";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import "../../styles/Home/Home.css";
import useToast from "../../components/Toast/ToastContext.jsx";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:3000/api/products");
            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data?.error || response.statusText);
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            showToast({
                type: "error",
                title: "Failed to Load Products",
                message: error.message || "An error occurred while loading",
            });
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader text="Loading products..." />;
    }

    return (
        <div className="home">
            <h1 className="page-title">Our Products</h1>
            {loading ? (
                <div className="loading-state">Loading products...</div>
            ) : products.length === 0 ? (
                <div className="empty-state">No products available</div>
            ) : (
                <ProductsGrid products={products} />
            )}
        </div>
    );
}
