import { useEffect, useState } from "react";
import api from "../../services/api";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  // GET ALL PRODUCTS
  const loadProducts = async () => {
    try {
      const response = await api.get("/admin/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error loading products:", error);
      alert("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${productId}`);

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product.id !== productId
        )
      );

      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Delete product error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete product."
      );
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="container py-4">
        <h2 className="fw-bold">Manage Products</h2>
        <p className="text-muted">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">

      {/* PAGE HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">Manage Products</h2>

        <p className="text-muted">
          View and manage products listed on Borrow Buddy.
        </p>
      </div>

      {products.length === 0 ? (

        <div className="text-center py-5">
          <h5>No products found</h5>

          <p className="text-muted">
            There are no products listed currently.
          </p>
        </div>

      ) : (

        <div className="row g-4">

          {products.map((product) => (

            <div
              className="col-md-6 col-lg-4"
              key={product.id}
            >

              <div className="card h-100 border-0 shadow-sm">

                {/* IMAGE */}
                <div
                  style={{
                    height: "220px",
                    backgroundColor: "#F4F7FA",
                    overflow: "hidden"
                  }}
                >
                  {product.image_url ? (

                    <img
                      src={product.image_url}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                  ) : (

                    <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                      No Image
                    </div>

                  )}
                </div>

                {/* CARD BODY */}
                <div className="card-body d-flex flex-column">

                  <span
                    className="badge align-self-start mb-2"
                    style={{
                      backgroundColor: "#E6F0FA",
                      color: "#0062BD"
                    }}
                  >
                    {product.category}
                  </span>

                  <h5 className="fw-bold">
                    {product.name}
                  </h5>

                  <p className="text-muted small">
                    {product.description}
                  </p>

                  <p className="mb-1">
                    <strong>Type:</strong> {product.type}
                  </p>

                  <p className="mb-1">
                    <strong>Owner:</strong> {product.owner_name}
                  </p>

                  <p className="mb-3">
                    <strong>Email:</strong> {product.owner_email}
                  </p>

                  {/* DELETE BUTTON */}
                  <button
                    className="btn btn-outline-danger mt-auto"
                    onClick={() =>
                      deleteProduct(product.id)
                    }
                  >
                    Delete Product
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default ManageProducts;