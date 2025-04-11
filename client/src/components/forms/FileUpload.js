import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar, Badge } from "antd";
import { useSelector } from "react-redux";
import { selectUser } from "../../reducers/selector";

const FileUpload = ({ values, setValues, setLoading }) => {
  const user = useSelector(selectUser);

  const createAuthHeaders = (authtoken) => ({
    headers: {
      Authorization: `Bearer ${authtoken}`,
    },
  });

  const fileUploadAndResize = (e) => {
    const files = e.target.files;
    let allUploadedFiles = values.images || [];

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          async (uri) => {
            try {
              const { data } = await axios.post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                createAuthHeaders(user?.token || "")
              );
              allUploadedFiles.push(data);
              setValues({ ...values, images: allUploadedFiles });
            } catch (err) {
              console.error("CLOUDINARY UPLOAD ERROR:", err.response?.data || err.message);
            } finally {
              setLoading(false);
            }
          },
          "base64"
        );
      }
    }
  };

  const handleImageRemove = async (public_id) => {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        createAuthHeaders(user?.token || "")
      );
      const filteredImages = values.images.filter((item) => item.public_id !== public_id);
      setValues({ ...values, images: filteredImages });
    } catch (err) {
      console.error("IMAGE REMOVE ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div className="image-preview-container" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {values.images?.map((image) => (
          <Badge
            count="X"
            key={image.public_id || image.url} // Use a unique key
            onClick={() => handleImageRemove(image.public_id)}
            style={{ cursor: "pointer" }}
          >
            <Avatar
              src={image.url}
              size={100}
              shape="square"
              style={{ border: "2px solid #ddd", borderRadius: "5px" }}
            />
          </Badge>
        ))}
      </div>
      <div className="file-upload-container" style={{ marginTop: "20px" }}>
        <label
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
        <p style={{ marginTop: "10px", fontSize: "14px", color: "#888" }}>
          You can select multiple images.
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
