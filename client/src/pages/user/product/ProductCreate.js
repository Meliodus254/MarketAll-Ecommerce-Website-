import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { Layout, Card, Row, Col, Spin } from "antd";
import SellNav from "../../../components/nav/SellNav";
import FileUpload from "../../../components/forms/FileUpload";
import { selectUser } from "../../../reducers/selector";

const { Content } = Layout;

const initialState = {
  title: "Macbook Provv",
  description: "This is the best Apple product",
  price: "45000",
  categories: [],
  category: "",
  subs: [],
  shipping: "Yes",
  quantity: "50",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "White",
  brand: "Apple",
  condition: "",
  location: { name: "", coordinates: { lat: null, lng: null } },
};

const ProductCreate = () => {
  const user = useSelector(selectUser);
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);

  // Fetch categories from the backend
  const loadCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await getCategories();
      if (res.data && Array.isArray(res.data)) {
        setValues((prevValues) => ({
          ...prevValues,
          categories: res.data,
        }));
      } else {
        message.error("❌ Failed to load categories. Please try again later.");
      }
    } catch (err) {
      console.error("Error loading categories", err);
      message.error("❌ Failed to load categories. Please try again later.");
    } finally {
      setLoadingCategories(false);
    }
  };

  // Handle category change and fetch subcategories
  const handleCategoryChange = async (value) => {
    setValues({ ...values, category: value, subs: [] });
    try {
      const res = await getCategorySubs(value);
      if (res && Array.isArray(res)) {
        setSubOptions(res);
      } else {
        message.warning("This category has no subcategories.");
        setSubOptions([]);
      }
    } catch (err) {
      console.error("Error loading subcategories", err);
      message.error("❌ Failed to load subcategories. Please try again later.");
    }
  };

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // Handle location update
  const handleLocationChange = (location) => {
    console.log("Location data received in parent:", location);  // Debugging line

    // Validate the location data before setting it
    if (!location || !location.name || !location.coordinates || !location.coordinates.lat || !location.coordinates.lng) {
      message.error("❌ Location data is incomplete.");
      return;
    }

    const locationData = {
      name: location.name,
      coordinates: {
        lat: location.coordinates.lat,
        lng: location.coordinates.lng
      }
    };

    // Update state with the extracted location data
    setValues((prevValues) => ({ ...prevValues, location: locationData }));
  };

  // Handle form submission
  const handleSubmit = async (formValues) => {
    setLoading(true);
    const token = user?.token || localStorage.getItem("token");

    if (!token) {
      message.error("❌ User not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    const { location } = formValues;

    // Log the entire formValues to ensure 'location' is included
    console.log("Full formValues in handleSubmit:", formValues);

    // Log the location to verify its structure
    console.log("Received location in handleSubmit:", location);

    // Validate location before submitting
    if (!location || !location.coordinates || location.coordinates.lat === null || location.coordinates.lng === null) {
      message.error("❌ Location details are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await createProduct(formValues, token);
      console.log("Create product response:", response);

      message.success(`✨ Product has been created successfully!`);
      setValues(initialState); // Reset form to initial state
      setTimeout(() => navigate("/seller/products"), 1500);  
    } catch (err) {
      console.error("Error creating product:", err);
      if (err.response) {
        message.error(`❌ ${err.response?.data?.error || "Error creating product."}`);
      } else {
        message.error("❌ An error occurred while creating the product.");
      }
    } finally {
      setLoading(false);  
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "20px" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8} md={6} lg={6}>
            <div style={{ position: "sticky", top: "20px" }}>
              <SellNav />
            </div>
          </Col>
          <Col xs={24} sm={16} md={18} lg={18}>
            <Card
              title="Create Product"
              bordered={false}
              style={{
                borderRadius: "10px",
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
                background: "#fff",
              }}
            >
              {loadingCategories ? (
                <Spin tip="Loading categories..." />
              ) : values.categories.length === 0 ? (
                <p>No categories available. Please try again later.</p>
              ) : (
                <>
                  {loading && <Spin tip="Creating product..." />}
                  <FileUpload
                    values={values}
                    setValues={setValues}
                    setLoading={setLoading}
                  />
                  <ProductCreateForm
                    handleSubmit={(formValues) => handleSubmit(values)} // Passing values with location data
                    handleChange={handleChange}
                    values={values}
                    handleCategoryChange={handleCategoryChange}
                    subOptions={subOptions}
                    handleLocationChange={handleLocationChange} // Pass location change handler
                  />
                </>
              )}
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ProductCreate;
