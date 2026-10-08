import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  // Support both PostgreSQL products and old mock products
  const imageUrl = product.image_url || product.image;
  const ownerName = product.owner_name || product.ownerName;

  const showBuy =
    product.type === "BUY" ||
    product.type === "BOTH" ||
    product.buy_price != null ||
    product.buyPrice != null;

  const showRent =
    product.type === "RENT" ||
    product.type === "BOTH" ||
    product.rent_price != null ||
    product.rentPrice != null;

  const buyPrice =
    product.buy_price ?? product.buyPrice;

  const rentPrice =
    product.rent_price ?? product.rentPrice;

  const rentDuration =
    product.rent_duration || product.rentDuration;

  const getRentDuration = () => {
    if (rentDuration === "DAY") return "/day";
    if (rentDuration === "WEEK") return "/week";
    if (rentDuration === "MONTH") return "/month";

    return "";
  };

  return (
    <div
      className="card h-100 border-0 shadow-sm"
      style={{
        borderRadius: "12px",
        overflow: "hidden"
      }}
    >

      {/* Product Image */}
      <div
        style={{
          height: "240px",
          backgroundColor: "#F4F7FA",
          overflow: "hidden"
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.parentElement.innerHTML = `
                <div style="
                  height:100%;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  color:#64748B;
                ">
                  No Image
                </div>
              `;
            }}
          />
        ) : (
          <div
            className="d-flex align-items-center justify-content-center h-100"
            style={{
              color: "#64748B"
            }}
          >
            No Image
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="card-body d-flex flex-column">

        {/* Category */}
        <span
          className="badge align-self-start mb-2"
          style={{
            backgroundColor: "#E6F0FA",
            color: "#0062BD"
          }}
        >
          {product.category}
        </span>

        {/* Product Name */}
        <h5 className="fw-semibold mb-2">
          {product.name}
        </h5>

        {/* Description */}
        {product.description && (
          <p className="text-muted small mb-2">
            {product.description}
          </p>
        )}

        {/* Owner */}
        <p className="mb-3">
          <strong>Owner:</strong>{" "}
          {ownerName || "Unknown"}
        </p>

        {/* Prices */}
        <div className="d-flex justify-content-between align-items-center mb-3">

          {showBuy && buyPrice != null && (
            <div>
              <span className="text-muted">
                Buy:
              </span>{" "}
              <strong>
                ₹{buyPrice}
              </strong>
            </div>
          )}

          {showRent && rentPrice != null && (
            <div>
              <span className="text-muted">
                Rent:
              </span>{" "}
              <strong>
                ₹{rentPrice}
              </strong>{" "}
              <small className="text-muted">
                {getRentDuration()}
              </small>
            </div>
          )}

          {product.type === "SHARE" && (
            <span className="badge bg-success">
              Available for Sharing
            </span>
          )}

        </div>

        {/* View Details */}
        <button
          className="btn mt-auto"
          style={{
            backgroundColor: "#F26522",
            color: "#FFFFFF",
            fontWeight: "600"
          }}
          onClick={() =>
            navigate(`/student/products/${product.id}`)
          }
        >
          View Details
        </button>

      </div>

    </div>
  );
}

export default ProductCard;