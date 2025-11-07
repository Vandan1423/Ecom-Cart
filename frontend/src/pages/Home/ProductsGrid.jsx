import ProductCard from "../../components/ProductCard/ProductCard";

export default function ProductsGrid({ products }) {
    return (
        <>
            <div className="products-grid">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </>
    );
}
