import React, { useState, useEffect, useCallback } from "react";
import SellNav from "../../../components/nav/SellNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProd, updateProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import { selectUser } from "../../../reducers/selector";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Card, Row, Col, Spin, message } from "antd";

const { Content } = Layout;

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
  condition: "",
  location: { name: "", coordinates: { lat: null, lng: null } },  // Added location field
};

const ProductUpdate = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const user = useSelector(selectUser);

  const loadProduct = useCallback(async () => {
    if (slug) {
      try {
        const { data } = await getProd(slug);
        if (data) {
          const product = data;
          setValues((prev) => ({
            ...prev,
            title: product.title,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            shipping: product.shipping,
            color: product.color,
            brand: product.brand,
            images: product.images || [],
            category: product.category ? product.category._id : "",
            subs: product.subs || [],
            condition: product.condition,
            location: product.location || { name: "", coordinates: { lat: null, lng: null } },  // Update location
          }));
          if (product.category) {
            await loadSubcategories(product.category._id);
          }
        } else {
          throw new Error("Invalid product data");
        }
      } catch (error) {
        toast.error("Failed to load product. Redirecting...");
        navigate("/user/products");
      }
    } else {
      toast.error("Invalid product identifier.");
      navigate("/user/products");
    }
  }, [slug, navigate]);

  const loadCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await getCategories();
      if (res.data && Array.isArray(res.data)) {
        setValues((prev) => ({
          ...prev,
          categories: res.data,
        }));
      } else {
        message.error("Failed to load categories.");
      }
    } catch (err) {
      message.error("Failed to load categories. Try again later.");
    } finally {
      setLoadingCategories(false);
    }
  };

  const loadSubcategories = async (categoryId) => {
    if (!categoryId) {
      setSubOptions([]);
      return;
    }
    try {
      const res = await getCategorySubs(categoryId);
      if (Array.isArray(res)) {
        setSubOptions(res);
      } else {
        message.warning("This category has no subcategories.");
        setSubOptions([]);
      }
    } catch (err) {
      message.error("Failed to load subcategories. Try again.");
    }
  };

  const handleCategoryChange = async (value) => {
    setValues({ ...values, category: value, subs: [] });
    await loadSubcategories(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // Handle location change
  const handleLocationChange = (location) => {
    if (!location || !location.name || !location.coordinates || !location.coordinates.lat || !location.coordinates.lng) {
      message.error("❌ Location data is incomplete.");
      return;
    }
    const locationData = {
      name: location.name,
      coordinates: {
        lat: location.coordinates.lat,
        lng: location.coordinates.lng,
      },
    };
    setValues((prevValues) => ({ ...prevValues, location: locationData }));
  };

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault(); // Safely handle the event

    const requiredFields = ["title", "price", "category", "quantity", "location"];
    for (const field of requiredFields) {
      if (!values[field] || (field === "location" && (!values.location.coordinates.lat || !values.location.coordinates.lng))) {
        toast.error(`Please fill in the ${field} field.`);
        return;
      }
    }

    setLoading(true);
    try {
      await updateProduct(slug, values, user.token);
      toast.success("Product updated successfully!");
      navigate("/seller/products");
    } catch (error) {
      toast.error("Failed to update product. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, [loadProduct]);

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
            <Card title="Update Product" bordered={false}>
              {loadingCategories ? (
                <Spin tip="Loading categories..." />
              ) : (
                <>
                  {loading && <Spin tip="Updating product..." />}
                  <FileUpload
                    values={values}
                    setValues={setValues}
                    setLoading={setLoading}
                  />
                  <ProductUpdateForm
                    handleSubmit={handleSubmit}  // Ensure e is passed here
                    handleChange={handleChange}
                    values={values}
                    handleCategoryChange={handleCategoryChange}
                    subOptions={subOptions}
                    handleLocationChange={handleLocationChange}  // Pass location change handler
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

export default ProductUpdate;
