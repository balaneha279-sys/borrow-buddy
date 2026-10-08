import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [availableFor, setAvailableFor] = useState([]);

  const [buyPrice, setBuyPrice] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [rentDuration, setRentDuration] = useState("DAY");

  const handleAvailabilityChange = (option) => {
    setAvailableFor((current) => {
      if (current.includes(option)) {
        return current.filter((item) => item !== option);
      }

      return [...current, option];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const storedUser =
        localStorage.getItem("borrowBuddyUser");

      if (!storedUser) {
        alert("Please login first.");
        navigate("/login");
        return;
      }

      if (availableFor.length === 0) {
        alert("Please select at least one option.");
        return;
      }

      const user = JSON.parse(storedUser);

      // Determine product type
      let type = "";

      const hasBuy = availableFor.includes("BUY");
      const hasRent = availableFor.includes("RENT");
      const hasShare = availableFor.includes("SHARE");

      if (hasBuy && hasRent) {
        type = "BOTH";
      } else if (hasBuy) {
        type = "BUY";
      } else if (hasRent) {
        type = "RENT";
      } else if (hasShare) {
        type = "SHARE";
      }

      // Validate Buy price
      if (
        (type === "BUY" || type === "BOTH") &&
        !buyPrice
      ) {
        alert("Please enter the buy price.");
        return;
      }

      // Validate Rent price
      if (
        (type === "RENT" || type === "BOTH") &&
        !rentPrice
      ) {
        alert("Please enter the rent price.");
        return;
      }

      const response = await api.post("/products", {
        name,
        description,
        category,
        type,
        image_url: imageUrl || null,

        buy_price:
          type === "BUY" || type === "BOTH"
            ? Number(buyPrice)
            : null,

        rent_price:
          type === "RENT" || type === "BOTH"
            ? Number(rentPrice)
            : null,

        rent_duration:
          type === "RENT" || type === "BOTH"
            ? rentDuration
            : null,

        owner_id: user.id
      });

      alert(response.data.message);

      navigate("/student/products");

    } catch (error) {
      console.error("Add product error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to add product. Please try again."
      );
    }
  };

  return (
    <div className="container py-4">

      <div className="mb-4">
        <h2 className="fw-bold">
          Add Product
        </h2>

        <p className="text-muted">
          List an item for buying, renting or sharing.
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        {/* Product Name */}
        <div className="mb-3">
          <label className="form-label">
            Product Name
          </label>

          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            required
          />
        </div>


        {/* Description */}
        <div className="mb-3">
          <label className="form-label">
            Description
          </label>

          <textarea
            className="form-control"
            rows="4"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Describe your product"
          />
        </div>


        {/* Category */}
        <div className="mb-3">
          <label className="form-label">
            Category
          </label>

          <select
            className="form-select"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            required
          >
            <option value="">
              Select Category
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Books">
              Books
            </option>

            <option value="Clothing">
              Clothing
            </option>

            <option value="Sports">
              Sports
            </option>

            <option value="Furniture">
              Furniture
            </option>

            <option value="Others">
              Others
            </option>
          </select>
        </div>


        {/* Available For */}
        <div className="mb-4">

          <label className="form-label fw-bold">
            Available For
          </label>

          <div className="d-flex gap-4 flex-wrap">

            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="buy"
                checked={availableFor.includes("BUY")}
                onChange={() =>
                  handleAvailabilityChange("BUY")
                }
              />

              <label
                className="form-check-label"
                htmlFor="buy"
              >
                Buy
              </label>
            </div>


            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rent"
                checked={availableFor.includes("RENT")}
                onChange={() =>
                  handleAvailabilityChange("RENT")
                }
              />

              <label
                className="form-check-label"
                htmlFor="rent"
              >
                Rent
              </label>
            </div>


            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="share"
                checked={availableFor.includes("SHARE")}
                onChange={() =>
                  handleAvailabilityChange("SHARE")
                }
              />

              <label
                className="form-check-label"
                htmlFor="share"
              >
                Share
              </label>
            </div>

          </div>
        </div>


        {/* Buy Price */}
        {(availableFor.includes("BUY")) && (
          <div className="mb-3">

            <label className="form-label">
              Buy Price (₹)
            </label>

            <input
              type="number"
              className="form-control"
              min="0"
              value={buyPrice}
              onChange={(e) =>
                setBuyPrice(e.target.value)
              }
              placeholder="Enter buy price"
            />

          </div>
        )}


        {/* Rent Price */}
        {(availableFor.includes("RENT")) && (
          <>

            <div className="mb-3">

              <label className="form-label">
                Rent Price (₹)
              </label>

              <input
                type="number"
                className="form-control"
                min="0"
                value={rentPrice}
                onChange={(e) =>
                  setRentPrice(e.target.value)
                }
                placeholder="Enter rent price"
              />

            </div>


            <div className="mb-3">

              <label className="form-label">
                Rent Duration
              </label>

              <select
                className="form-select"
                value={rentDuration}
                onChange={(e) =>
                  setRentDuration(e.target.value)
                }
              >
                <option value="DAY">
                  Per Day
                </option>

                <option value="WEEK">
                  Per Week
                </option>

                <option value="MONTH">
                  Per Month
                </option>
              </select>

            </div>

          </>
        )}


        {/* Image URL */}
        <div className="mb-4">

          <label className="form-label">
            Image URL
          </label>

          <input
            type="url"
            className="form-control"
            value={imageUrl}
            onChange={(e) =>
              setImageUrl(e.target.value)
            }
            placeholder="https://example.com/image.jpg"
          />

        </div>


        <button
          type="submit"
          className="btn btn-primary"
        >
          Add Product
        </button>

      </form>

    </div>
  );
}

export default AddProduct;