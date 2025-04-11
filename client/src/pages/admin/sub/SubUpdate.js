import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { updateSub, getSub } from "../../../functions/sub";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Input, Form, Select, Spin } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { selectUser } from "../../../reducers/selector";

const { Option } = Select;

const SubUpdate = () => {
  const user = useSelector(selectUser); 
  const { slug } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesRes, subRes] = await Promise.all([
          getCategories(),
          getSub(slug),
        ]);
        setCategories(categoriesRes.data);
        setName(subRes.data.name);
        setParent(subRes.data.parent);
      } catch (error) {
        toast.error("Error loading data. Please try again.");
      }
    };
    loadData();
  }, [slug]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await updateSub(slug, { name, parent }, user.token);
      setLoading(false);
      toast.success(`${res.data.name} has been updated successfully!`);
      navigate("/admin/sub");
    } catch (err) {
      setLoading(false);
      if (err.response?.status === 400) {
        toast.error(err.response.data);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  // Centralized style definitions
  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      background: "#f5f5f5",
    },
    sidebar: {
      flex: "0 0 250px",
      background: "#ffffff",
      borderRight: "1px solid #e0e0e0",
      boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
      padding: "16px",
    },
    content: {
      flex: 1,
      padding: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f5f5f5",
    },
    card: {
      maxWidth: "600px",
      width: "100%",
      borderRadius: "10px",
      boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
      background: "#fff",
    },
    button: {
      width: "100%",
      background: "#1890ff",
      borderColor: "#1890ff",
      height: "45px",
      fontSize: "16px",
      fontWeight: "bold",
      borderRadius: "5px",
      transition: "background 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <AdminNav />
      </div>

      {/* Content Area */}
      <div style={styles.content}>
        <Card
          title={
            <h2 style={{ margin: 0, color: "#333", fontSize: "24px" }}>
              Update Subcategory
            </h2>
          }
          bordered={false}
          style={styles.card}
        >
          {/* Subcategory Form */}
          <Form onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label={<strong>Parent Category</strong>}
              rules={[{ required: true, message: "Parent category is required" }]}
            >
              <Select
                value={parent}
                onChange={(value) => setParent(value)}
                placeholder="Select parent category"
                disabled={loading}
                style={{ borderRadius: "5px", width: "100%", fontSize: "16px" }}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={<strong>Subcategory Name</strong>}
              rules={[{ required: true, message: "Subcategory name is required" }]}
            >
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter subcategory name"
                disabled={loading}
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
              disabled={!name || !parent}
              style={styles.button}
              onMouseEnter={(e) => (e.target.style.background = "#40a9ff")}
              onMouseLeave={(e) => (e.target.style.background = "#1890ff")}
            >
              {loading ? "Updating..." : "Update Subcategory"}
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default SubUpdate;
