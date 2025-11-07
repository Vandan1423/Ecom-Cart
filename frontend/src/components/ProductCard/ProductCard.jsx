import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import "../../styles/ProductCard/ProductCard.css";

export default function ProductCard({ product }) {
    return (
        <div className="product-card">
            <ProductImage image={product.image} name={product.title} />
            <ProductInfo product={product} />
        </div>
    );
}
