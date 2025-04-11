import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate
import { Card, Button, Input, Form, Spin } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { selectUser } from "../../../reducers/selector";

const CategoryUpdate = () => {
  const user = useSelector(selectUser); 
  const { slug } = useParams();  // Use useParams to get the slug from the URL
  const navigate = useNavigate(); // For navigation after category update

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load the category data using the slug from the URL
    const loadCategory = () => {
      getCategory(slug).then((c) => setName(c.data.name));
    };
    loadCategory();
  }, [slug]); // Re-run when the slug changes

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" has been updated successfully!`);
        navigate("/admin/category"); // Navigate to the categories list page after update
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f5f5" }}>
      {/* Sidebar */}
      <div
        style={{
          flex: "0 0 250px",
          background: "#ffffff",
          borderRight: "1px solid #e0e0e0",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
          padding: "16px",
        }}
      >
        <AdminNav />
      </div>

      {/* Content Area */}
      <div
        style={{
          flex: "1",
          padding: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f5f5",
        }}
      >
        <Card
          title={<h2 style={{ margin: 0, color: "#333", fontSize: "24px" }}>Update Category</h2>}
          bordered={false}
          style={{
            maxWidth: "600px",
            width: "100%",
            borderRadius: "10px",
            boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
            background: "#fff",
          }}
        >
          {/* Category Form */}
          <Form onSubmitCapture={handleSubmit} layout="vertical">
            <Form.Item label={<strong>Category Name</strong>}>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter category name"
                disabled={loading}
                required
                style={{
                  borderRadius: "5px",
                  height: "40px",
                  padding: "0 15px",
                  fontSize: "16px",
                }}
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={loading ? <Spin /> : <EditOutlined />}
              loading={loading}
              disabled={!name}
              style={{
                width: "100%",
                background: "#1890ff",
                borderColor: "#1890ff",
                height: "45px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "5px",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={(e) => e.target.style.background = "#40a9ff"}
              onMouseLeave={(e) => e.target.style.background = "#1890ff"}
            >
              {loading ? "Updating..." : "Update Category"}
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default CategoryUpdate;
