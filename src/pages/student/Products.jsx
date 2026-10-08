import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import api from "../../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await api.get("/products");

      setProducts(response.data);

    } catch (error) {
      console.error("Error loading products:", error);

      alert("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-4">
        <h2 className="fw-bold mb-2">
          Products
        </h2>

        <p className="text-muted">
          Loading products...
        </p>
      </div>
    );
  }

  return (
    <div className="container py-4">

      <h2 className="fw-bold mb-2">
        Products
      </h2>

      <p className="text-muted mb-4">
        Browse products available from students.
      </p>

      <div className="row g-4">

        {products.length === 0 ? (
          <div className="col-12">
            <p className="text-muted">
              No products available.
            </p>
          </div>
        ) : (
          products.map((product) => (
            <div
              className="col-md-6 col-lg-4"
              key={product.id}
            >
              <ProductCard product={product} />
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Products;