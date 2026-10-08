import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function MyListings() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadMyListings();
  }, []);

  const loadMyListings = async () => {
    try {
      const storedUser = localStorage.getItem("borrowBuddyUser");

      if (!storedUser) {
        navigate("/login");
        return;
      }

      const user = JSON.parse(storedUser);

      const response = await api.get("/products");

      const myProducts = response.data.filter(
        (product) => Number(product.owner_id) === Number(user.id)
      );

      setProducts(myProducts);

    } catch (error) {
      console.error("Error loading listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
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

    } catch (error) {
      console.error("Delete error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to delete product."
      );
    }
  };

  if (loading) {
    return (
      <div className="container py-4">
        <h2 className="fw-bold">My Listings</h2>
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">

      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          My Listings
        </h2>

        <p className="text-muted mb-0">
          Manage the products you have listed.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-5">
          <h5>No listings yet</h5>

          <p className="text-muted">
            Add a product to see it here.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/student/add-product")}
          >
            Add Product
          </button>
        </div>
      ) : (
        <div className="row g-4">

          {products.map((product) => (
            <div
              className="col-sm-6 col-lg-4"
              key={product.id}
            >

              <div className="card h-100 border-0 shadow-sm">

                {/* Image */}
                <div
                  style={{
                    height: "220px",
                    backgroundColor: "#f4f7fa",
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
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center h-100 text-muted"
                    >
                      No Image
                    </div>
                  )}
                </div>

                {/* Content */}
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

                  <h5 className="fw-bold mb-2">
                    {product.name}
                  </h5>

                  <p className="text-muted small mb-2">
                    {product.description}
                  </p>

                  <div className="small mb-3">

                    <div className="mb-1">
                      <strong>Type:</strong>{" "}
                      {product.type}
                    </div>

                    <div className="mb-1">
                      <strong>Price:</strong>{" "}
                      ₹{product.price}
                    </div>

                    <div>
                      <strong>Owner:</strong>{" "}
                      {product.owner_name}
                    </div>

                  </div>

                  {/* Buttons */}
                  <div className="mt-auto d-flex gap-2">

                    <button
                      className="btn btn-primary flex-grow-1"
                      onClick={() =>
                        navigate(
                          `/student/products/${product.id}`
                        )
                      }
                    >
                      View Details
                    </button>

                    <button
                      className="btn btn-outline-danger"
                      onClick={() =>
                        handleDelete(product.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default MyListings;