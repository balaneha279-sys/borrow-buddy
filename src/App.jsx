import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

import ProtectedRoute from "./components/ProtectedRoute";

import StudentLayout from "./layouts/StudentLayout";
import AdminLayout from "./layouts/AdminLayout";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import StudentHome from "./pages/student/StudentHome";
import Products from "./pages/student/Products";
import ProductDetails from "./pages/student/ProductDetails";
import AddProduct from "./pages/student/AddProduct";
import MyListings from "./pages/student/MyListings";
import MyRequests from "./pages/student/MyRequests";
import IncomingRequests from "./pages/student/IncomingRequests";
import Profile from "./pages/student/Profile";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageProducts from "./pages/admin/ManageProducts";
import Reports from "./pages/admin/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* ================= STUDENT ================= */}

        <Route
          path="/student"
          element={
            <ProtectedRoute role="STUDENT">
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<StudentHome />}
          />

          <Route
            path="products"
            element={<Products />}
          />

          <Route
            path="products/:id"
            element={<ProductDetails />}
          />

          <Route
            path="add-product"
            element={<AddProduct />}
          />

          <Route
            path="my-listings"
            element={<MyListings />}
          />

          <Route
            path="my-requests"
            element={<MyRequests />}
          />

          <Route
             path="incoming-requests"
              element={<IncomingRequests />}
          />
          <Route
            path="profile"
            element={<Profile />}
          />
        </Route>


        {/* ================= ADMIN ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="students"
            element={<ManageStudents />}
          />

          <Route
            path="products"
            element={<ManageProducts />}
          />

          <Route
            path="reports"
            element={<Reports />}
          />
        </Route>


        {/* ================= FALLBACK ================= */}

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;