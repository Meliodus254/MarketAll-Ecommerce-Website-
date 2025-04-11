import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { createSub, getSubs, removeSub } from "../../../functions/sub";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card, Button, Spin, Select } from "antd";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { selectUser } from "../../../reducers/selector";

const { Option } = Select;

const SubCreate = () => {
  const user = useSelector(selectUser); 
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(""); // For storing selected category
  const [subs, setSubs] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () => getCategories().then((c) => setCategories(c.data));

  const loadSubs = () => getSubs().then((s) => setSubs(s.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created`);
        loadSubs();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`${res.data.name} has been deleted!`);
          loadSubs();
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
  };

  const searched = (keyword) => (sub) =>
    sub.name.toLowerCase().includes(keyword.toLowerCase());

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
        {loading ? (
          <Spin size="large" tip="Loading..." />
        ) : (
          <Card
            title={<h2 style={{ margin: 0, color: "#333", fontSize: "24px" }}>Create Subcategory</h2>}
            bordered={false}
            style={{
              maxWidth: "600px",
              width: "100%",
              borderRadius: "10px",
              boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
              background: "#fff",
            }}
          >
            {/* Parent Category Dropdown */}
            <div className="form-group" style={{ marginBottom: "20px" }}>
              <label style={{ fontWeight: "500" }}>Parent Category</label>
              <Select
                value={category}
                onChange={(value) => setCategory(value)}
                placeholder="Please select"
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  fontSize: "16px",
                  marginBottom: "15px",
                }}
              >
                {categories.length > 0 &&
                  categories.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
              </Select>
            </div>

            {/* Subcategory Form */}
            <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />

            <hr style={{ marginTop: "30px", borderTop: "2px solid #e0e0e0" }} />

            {/* Search Filter */}
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />

            {/* Subcategories List */}
            <div>
              {subs.filter(searched(keyword)).map((s) => (
                <Card
                  key={s._id}
                  style={{
                    marginBottom: "10px",
                    borderRadius: "5px",
                    border: "1px solid #f0f0f0",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                    background: "#fafafa",
                    padding: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "16px", fontWeight: "500" }}>{s.name}</span>
                  <div>
                    <Link to={`/admin/sub/${s.slug}`}>
                      <Button
                        icon={<EditOutlined />}
                        size="small"
                        style={{
                          marginRight: "10px",
                          borderRadius: "5px",
                          backgroundColor: "#ffec3d",
                          borderColor: "#ffec3d",
                          transition: "background-color 0.3s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#f5e400")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "#ffec3d")
                        }
                      />
                    </Link>
                    <Button
                      icon={<DeleteOutlined />}
                      size="small"
                      type="danger"
                      onClick={() => handleRemove(s.slug)}
                      style={{
                        borderRadius: "5px",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#ff4d4f")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#ff5555")
                      }
                    />
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SubCreate;
