import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.png"; // Fallback image
import { Link } from "react-router-dom";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { images, title, description, slug, price } = product;

  return (
    <Card
      hoverable
      cover={
        <img
          src={images && images.length ? images[0].url : laptop} // Fallback to laptop image if no product image is found
          alt={title} // Added alt text for better accessibility
          style={{ height: "200px", objectFit: "cover" }} // Adjusted the height and object fit for better presentation
          className="p-1"
        />
      }
      actions={[
        <Link to={`/product/${slug}`}>
          <EyeOutlined className="text-warning" /> <br /> View Product
        </Link>,
        <div>
          <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
        </div>,
      ]}
    >
      <Meta
        title={title}
        description={`${description?.substring(0, 40)}...`} // Adding the first 40 characters of description
      />
      <div className="price text-center mt-2">
        <h5>₹ {price}</h5> {/* Displaying price */}
      </div>
    </Card>
  );
};

export default ProductCard;
