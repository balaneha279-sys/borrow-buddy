import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Product fetch error:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const sendRequest = async (requestType) => {
    try {
      const storedUser =
        localStorage.getItem("borrowBuddyUser");

      if (!storedUser) {
        alert("Please login first.");
        navigate("/login");
        return;
      }

      const user = JSON.parse(storedUser);

      setSending(true);

      const response = await api.post("/requests", {
        product_id: product.id,
        requester_id: user.id,
        request_type: requestType
      });

      alert(response.data.message);

      // Go to My Requests after sending
      navigate("/student/my-requests");

    } catch (error) {
      console.error("Request error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to send request."
      );
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-4">
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-4">
        <h3>Product not found</h3>

        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/student/products")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  const canBuy =
    product.type === "BUY" ||
    product.type === "BOTH";

  const canRent =
    product.type === "RENT" ||
    product.type === "BOTH";

  const canShare =
    product.type === "SHARE";

  return (
    <div className="container py-4">

      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate("/student/products")}
      >
        ← Back to Products
      </button>

      <div className="row">

        {/* Product Image */}
        <div className="col-md-6">

          <div
            style={{
              height: "450px",
              backgroundColor: "#F4F7FA",
              borderRadius: "12px",
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

        </div>

        {/* Product Information */}
        <div className="col-md-6">

          <span
            className="badge mb-3"
            style={{
              backgroundColor: "#E6F0FA",
              color: "#0062BD"
            }}
          >
            {product.category}
          </span>

          <h2 className="fw-bold">
            {product.name}
          </h2>

          <p className="text-muted">
            {product.description}
          </p>

          <hr />

          <p>
            <strong>Owner:</strong>{" "}
            {product.owner_name}
          </p>

          {/* Buy Price */}
          {canBuy && (
            <p>
              <strong>Buy Price:</strong>{" "}
              ₹{product.buy_price}
            </p>
          )}

          {/* Rent Price */}
          {canRent && (
            <p>
              <strong>Rent Price:</strong>{" "}
              ₹{product.rent_price}

              {product.rent_duration && (
                <span className="text-muted">
                  {" "}
                  / {product.rent_duration.toLowerCase()}
                </span>
              )}
            </p>
          )}

          {canShare && (
            <p>
              <strong>Available for sharing</strong>
            </p>
          )}

          <div className="mt-4 d-flex gap-2 flex-wrap">

            {/* Buy */}
            {canBuy && (
              <button
                className="btn"
                style={{
                  backgroundColor: "#F26522",
                  color: "white"
                }}
                disabled={sending}
                onClick={() => sendRequest("BUY")}
              >
                {sending ? "Sending..." : "Request to Buy"}
              </button>
            )}

            {/* Rent */}
            {canRent && (
              <button
                className="btn btn-primary"
                disabled={sending}
                onClick={() => sendRequest("RENT")}
              >
                {sending ? "Sending..." : "Request to Rent"}
              </button>
            )}

            {/* Share */}
            {canShare && (
              <button
                className="btn btn-success"
                disabled={sending}
                onClick={() => sendRequest("SHARE")}
              >
                {sending ? "Sending..." : "Request to Share"}
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;