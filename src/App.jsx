import { useEffect, useState } from "react";
import ProductCard from "./components/Productcard";

export default function App() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();

        setProducts(data.products);
        setFiltered(data.products);
      } catch (err) {
        setError("Failed to load products.");
      }
      setLoading(false);
    }

    loadProducts();
  }, []);

  useEffect(() => {
    let results = products;

    if (search.trim() !== "") {
      results = results.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      results = results.filter((p) => p.category === category);
    }

    setFiltered(results);
  }, [search, category, products]);

  if (loading) return <h2 style={{ padding: 20 }}>Loading...</h2>;
  if (error) return <h2 style={{ padding: 20 }}>{error}</h2>;

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  return (
    <div style={{ padding: 20 }}>
      <h1>Product Dashboard</h1>

      <div style={{ display: "flex", gap: 10, margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: 10 }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: 10 }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 20,
        }}
      >
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
