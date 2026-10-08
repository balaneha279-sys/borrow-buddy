import { useState } from "react";
import { Link } from "react-router-dom";
import { categories, products as mockProducts } from "../../data/mockData";
import ProductCard from "../../components/ProductCard";

function StudentHome() {
  const [search, setSearch] = useState("");

  const savedProducts =
    JSON.parse(localStorage.getItem("borrowBuddyProducts")) || [];

  const allProducts = [
    ...mockProducts,
    ...savedProducts,
  ];

  const filteredProducts = allProducts.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>

      {/* HERO */}
      <section className="hero-section">
        <div>
          <h1>Borrow. Share. Save.</h1>

          <p>
            Find useful products from students in your campus.
          </p>

          <Link
            to="/student/products"
            className="btn btn-cta"
          >
            Explore Products
          </Link>
        </div>
      </section>


      {/* SEARCH */}
      <div className="mt-4">
        <input
          className="form-control form-control-lg"
          placeholder="Search books, electronics, sports items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>


      {/* CATEGORIES */}
      <section className="mt-5">

        <h3>Categories</h3>

        <div className="row g-3 mt-2">

          {categories.map((category) => (

            <div
              className="col-6 col-md-4 col-lg-2"
              key={category.id}
            >

              <Link
                to={`/student/products?category=${encodeURIComponent(
                  category.name
                )}`}
                className="category-card"
              >

                <div className="category-icon">
                  {category.icon}
                </div>

                <span>{category.name}</span>

              </Link>

            </div>

          ))}

        </div>

      </section>


      {/* PRODUCTS */}
      <section className="mt-5">

        <div className="d-flex justify-content-between">

          <h3>Featured Products</h3>

          <Link to="/student/products">
            View All
          </Link>

        </div>

        <div className="row g-4 mt-1">

          {filteredProducts
            .slice(0, 4)
            .map((product) => (

              <div
                className="col-md-6 col-lg-3"
                key={product.id}
              >
                <ProductCard product={product} />
              </div>

            ))}

        </div>

      </section>

    </div>
  );
}

export default StudentHome;