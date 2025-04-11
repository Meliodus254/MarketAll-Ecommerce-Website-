import React, { useState } from "react";
import { Card, Button, Input, Form, Spin, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth"; // Firebase auth imports
import SettingsNav from "../../../components/nav/SettingsNav";

const Password = () => {
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const handleSubmitPasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      message.error("No user is currently signed in.");
      return;
    }

    setLoading(true);

    try {
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password after re-authentication
      await updatePassword(user, newPassword);

      setLoading(false);
      message.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setLoading(false);

      if (err.code === "auth/wrong-password") {
        message.error("Incorrect current password. Please try again.");
      } else if (err.code === "auth/requires-recent-login") {
        message.error("Please log out and log in again to change your password.");
      } else {
        message.error(err.message || "Failed to update password.");
      }
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
          justifyContent: "center",
          alignItems: "center",
          background: "#f8f9fa",
        }}
      >
        <Card
          title={<h2 style={{ margin: 0 }}>Change Password</h2>}
          bordered={false}
          style={{
            maxWidth: "500px",
            width: "100%",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            background: "#ffffff",
          }}
        >
          <Form onSubmitCapture={handleSubmitPasswordChange} layout="vertical">
            <Form.Item label={<strong>Current Password</strong>}>
              <Input.Password
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                disabled={loading}
                required
              />
            </Form.Item>
            <Form.Item label={<strong>New Password</strong>}>
              <Input.Password
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                disabled={loading}
                required
              />
            </Form.Item>
            <Form.Item label={<strong>Confirm New Password</strong>}>
              <Input.Password
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                disabled={loading}
                required
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={loading ? <Spin /> : <LockOutlined />}
              loading={loading}
              disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
              style={{
                width: "100%",
                background: "#1890ff",
                borderColor: "#1890ff",
                height: "40px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Password;
