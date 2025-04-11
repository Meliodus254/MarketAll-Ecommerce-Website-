import React, { useEffect } from "react";
import { Form, Input, Select, Button, InputNumber } from "antd";
import LocationPicker from "../../components/LocationPicker"; // Import the custom LocationPicker component

const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  handleCategoryChange,
  handleLocationChange, // Add location handler
  values,
  subOptions,
}) => {
  const {
    title,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    colors,
    brands,
    color,
    brand,
    location, // Assuming location is part of the values
  } = values || {};

  // Debugging: Log categories and subcategories whenever they update
  useEffect(() => {
    console.log("Categories:", categories);
    console.log("Subcategories:", subOptions);
  }, [categories, subOptions]);

  return (
    <Form onFinish={handleSubmit} layout="vertical">
      {/* Location Field */}
      <Form.Item
        label="Location"
        name={["location", "name"]}
        initialValue={location?.name || ""} // Ensure the default value is correct
        rules={[{ required: false }]} // Assuming location is optional, remove required if not
      >
        <LocationPicker 
          onLocationSelect={(locationData) => {
            console.log('Location selected:', locationData);  // Debugging line
            handleLocationChange(locationData);  // Update the parent component's location state
          }}
        />
      </Form.Item>

      {/* Title Field */}
      <Form.Item
        label="Title"
        name="title"
        initialValue={title || ""}
        rules={[{ required: true, message: "Please input the product title!" }]}
      >
        <Input name="title" onChange={handleChange} placeholder="Enter product title" />
      </Form.Item>

      {/* Description Field */}
      <Form.Item
        label="Description"
        name="description"
        initialValue={description || ""}
        rules={[{ required: true, message: "Please input the product description!" }]}
      >
        <Input name="description" onChange={handleChange} placeholder="Enter product description" />
      </Form.Item>

      {/* Price Field */}
      <Form.Item
        label="Price"
        name="price"
        initialValue={price || 0}
        rules={[{ required: true, message: "Please input the product price!" }]}
      >
        <InputNumber
          name="price"
          onChange={(value) => handleChange({ target: { name: "price", value } })}
          placeholder="Enter product price"
          style={{ width: "100%" }}
        />
      </Form.Item>

      {/* Category Field */}
      <Form.Item label="Category" name="category" initialValue={category || ""}>
        <Select placeholder="Select category" onChange={handleCategoryChange}>
          {Array.isArray(categories) &&
            categories.map((cat, index) => (
              <Option key={cat._id || `cat-${index}`} value={cat._id}>
                {cat.name}
              </Option>
            ))}
        </Select>
      </Form.Item>

      {/* Subcategories Field */}
      <Form.Item label="Subcategories" name="subs" initialValue={[]}>
        <Select
          mode="multiple"
          placeholder="Select subcategories"
          onChange={(value) => handleChange({ target: { name: "subs", value } })}
        >
          {Array.isArray(subOptions) && subOptions.length > 0 ? (
            subOptions.map((sub, index) => (
              <Option key={sub._id || `sub-${index}`} value={sub._id}>
                {sub.name}
              </Option>
            ))
          ) : (
            <Option value="" disabled>
              No subcategories available
            </Option>
          )}
        </Select>
      </Form.Item>

      {/* Quantity Field */}
      <Form.Item label="Quantity" name="quantity" initialValue={quantity || 0}>
        <InputNumber
          name="quantity"
          onChange={(value) => handleChange({ target: { name: "quantity", value } })}
          placeholder="Enter product quantity"
          style={{ width: "100%" }}
        />
      </Form.Item>

      {/* Shipping Field */}
      <Form.Item label="Shipping" name="shipping" initialValue={shipping || "No"}>
        <Select onChange={(value) => handleChange({ target: { name: "shipping", value } })}>
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
        </Select>
      </Form.Item>

      {/* Color Field */}
      <Form.Item label="Color" name="color" initialValue={color || ""}>
        <Select
          placeholder="Select color"
          onChange={(value) => handleChange({ target: { name: "color", value } })}
        >
          {Array.isArray(colors) &&
            colors.map((col, index) => (
              <Option key={`${col}-${index}`} value={col}>
                {col}
              </Option>
            ))}
        </Select>
      </Form.Item>

      {/* Brand Field */}
      <Form.Item label="Brand" name="brand" initialValue={brand || ""}>
        <Select
          placeholder="Select brand"
          onChange={(value) => handleChange({ target: { name: "brand", value } })}
        >
          {Array.isArray(brands) &&
            brands.map((b, index) => (
              <Option key={`${b}-${index}`} value={b}>
                {b}
              </Option>
            ))}
        </Select>
      </Form.Item>

      {/* Condition Field */}
      <Form.Item
        label="Condition"
        name="condition"
        initialValue={values.condition}
        rules={[{ required: true, message: "Please select the condition!" }]}
      >
        <Select
          placeholder="Select condition"
          onChange={(value) => handleChange({ target: { name: "condition", value } })}
        >
          <Option value="New">New</Option>
          <Option value="Used">Used</Option>
          <Option value="Refurbished">Refurbished</Option>
        </Select>
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Save Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductUpdateForm;
