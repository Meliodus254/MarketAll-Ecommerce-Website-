import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Support from "./pages/Support";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Settings from "./pages/user/Settings";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Wishlist from "./pages/user/Wishlist";
import Password from "./pages/user/settings/Password";
import Personal from "./pages/user/settings/Personal";
import Sell from "./pages/user/Sell";
import SellerProduct from "./pages/user/SellerProduct";
import SellerHelp from "./pages/user/SellerHelp";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/user/product/ProductCreate";
import ProductUpdate from "./pages/user/product/ProductUpdate";
import AdminProductReview from "./pages/admin/approval/AdminProductReview";
import AdminProductReject from "./pages/admin/disapproval/AdminProductReject";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { Spin } from "antd";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const idTokenResult = await user.getIdTokenResult();
          const userData = await currentUser(idTokenResult.token);

          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: userData.name,
              email: userData.email,
              token: idTokenResult.token,
              role: userData.role,
              _id: userData._id,
            },
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        dispatch({
          type: "LOGGED_OUT_USER",
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div style={styles.pageContainer}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register/complete" element={<RegisterComplete />} />
          <Route path="/support" element={<Support />} />
          <Route path="/forgot/password" element={<ForgotPassword />} />

          {/* Protect user routes */}
          <Route element={<UserRoute />}>
            <Route path="/orders" element={<Orders />} />
            <Route path="/user/settings" element={<Settings />} />
            <Route path="/user/wishlist" element={<Wishlist />} />
            <Route path="/user/password" element={<Password />} />
            <Route path="/user/personal-information" element={<Personal />} />
            <Route path="/user/product/:slug" element={<ProductUpdate />} />
            <Route path="/user/sell" element={<Sell />} />
            <Route path="/user/product" element={<ProductCreate />} />
            <Route path="/seller/products" element={<SellerProduct/>}/>
            <Route path="/seller/help" element={<SellerHelp/>}/>
          </Route>

          {/* Protect admin route */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/category" element={<CategoryCreate />} />
            <Route path="/admin/category/:slug" element={<CategoryUpdate />} />
            <Route path="/admin/sub" element={<SubCreate />} />
            <Route path="/admin/sub/:slug" element={<SubUpdate />} />
            <Route path="/admin/approveproducts" element={<AdminProductReview />} />
            <Route path="/admin/disapproveproducts" element={<AdminProductReject />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    marginTop: "60px",
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

export default App;
