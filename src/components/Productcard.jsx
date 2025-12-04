export default function ProductCard({ product }) {
  return (
    <div style={{ background: "#fff", padding: 15, borderRadius: 8 }}>
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{
          width: "100%",
          height: 180,
          objectFit: "cover",
          borderRadius: 6,
        }}
      />
      <h3>{product.title}</h3>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
    </div>
  );
}
