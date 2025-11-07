export default function ProductImage({ image, name }) {
    return (
        <div className="product-image-container">
            <img
                src={image}
                alt={name}
                className="product-image"
                loading="lazy"
            />
        </div>
    );
}
