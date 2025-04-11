import React, { useState } from "react";
import { Card, Button, Input, Form, DatePicker, message, Select } from "antd";
import SettingsNav from "../../../components/nav/SettingsNav";
import LocationPicker from "../../../components/LocationPicker"; // Assume this component exists

const { Option } = Select;

const Personal = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [location, setLocation] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState({});

  const handleSave = async (field, value) => {
    setLoading((prev) => ({ ...prev, [field]: true }));

    try {
      // Simulate an API call to update the field
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock API delay
      message.success(`${field} updated successfully.`);
    } catch (err) {
      message.error(`Failed to update ${field}: ${err.message}`);
    } finally {
      setLoading((prev) => ({ ...prev, [field]: false }));
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4f4f9" }}>
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
        <SettingsNav />
      </div>

      {/* Content Area */}
      <div
        style={{
          flex: "1",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          background: "#f8f9fa",
        }}
      >
        {/* First Name */}
        <Card title={<h2>Update First Name</h2>} style={{ width: "100%", maxWidth: "500px" }}>
          <Form layout="vertical" onFinish={() => handleSave("First Name", firstName)}>
            <Form.Item label="First Name">
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading["First Name"]}>
              Save
            </Button>
          </Form>
        </Card>

        {/* Last Name */}
        <Card title={<h2>Update Last Name</h2>} style={{ width: "100%", maxWidth: "500px" }}>
          <Form layout="vertical" onFinish={() => handleSave("Last Name", lastName)}>
            <Form.Item label="Last Name">
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading["Last Name"]}>
              Save
            </Button>
          </Form>
        </Card>

        {/* Sex */}
        <Card title={<h2>Update Sex</h2>} style={{ width: "100%", maxWidth: "500px" }}>
          <Form layout="vertical" onFinish={() => handleSave("Sex", sex)}>
            <Form.Item label="Sex">
              <Select value={sex} onChange={(value) => setSex(value)} placeholder="Select your sex">
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading["Sex"]}>
              Save
            </Button>
          </Form>
        </Card>

        {/* Birthdate */}
        <Card title={<h2>Update Birthdate</h2>} style={{ width: "100%", maxWidth: "500px" }}>
          <Form layout="vertical" onFinish={() => handleSave("Birthdate", birthdate)}>
            <Form.Item label="Birthdate">
              <DatePicker
                value={birthdate}
                onChange={(date) => setBirthdate(date)}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading["Birthdate"]}>
              Save
            </Button>
          </Form>
        </Card>

        {/* Location */}
        <Card title={<h2>Update Location</h2>} style={{ width: "100%", maxWidth: "500px" }}>
          <Form layout="vertical" onFinish={() => handleSave("Location", location)}>
            <Form.Item label="Location">
              <LocationPicker value={location} onChange={setLocation} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading["Location"]}>
              Save
            </Button>
          </Form>
        </Card>

        {/* Email */}
        <Card title={<h2>Update Email</h2>} style={{ width: "100%", maxWidth: "500px" }}>
          <Form layout="vertical" onFinish={() => handleSave("Email", email)}>
            <Form.Item label="Email">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your new email"
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading["Email"]}>
              Save
            </Button>
          </Form>
        </Card>

        {/* Phone */}
        <Card title={<h2>Update Phone</h2>} style={{ width: "100%", maxWidth: "500px" }}>
          <Form layout="vertical" onFinish={() => handleSave("Phone", phone)}>
            <Form.Item label="Phone">
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your new phone number"
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading["Phone"]}>
              Save
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Personal;
