import React from "react";
import { Form, Input, Select, InputNumber, Button } from "antd";
import LocationPicker from "../../components/LocationPicker"; // Import custom LocationPicker component

const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  values,
  handleCategoryChange,
  subOptions,
  handleLocationChange,
}) => {
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    colors,
    brands,
    color,
    brand,
    location,
  } = values;

  return (
    <Form
      onFinish={(formValues) => handleSubmit({ ...values, ...formValues })}
      layout="vertical"
    >
      <Form.Item
        label="Location"
        name={["location", "name"]}
        initialValue={location?.name || ""} // Ensure the default is correct
        rules={[{ required: false,}]}
      >
        <LocationPicker 
          onLocationSelect={(locationData) => {
            console.log('Location selected:', locationData);  // Debugging line
            handleLocationChange(locationData);  // Ensure the parent function is correctly updating the state
          }}
        />
      </Form.Item>

      <Form.Item
        label="Title"
        name="title"
        initialValue={title}
        rules={[{ required: true, message: "Please input the product title!" }]}
      >
        <Input name="title" onChange={handleChange} placeholder="Enter product title" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        initialValue={description}
        rules={[{ required: true, message: "Please input the product description!" }]}
      >
        <Input name="description" onChange={handleChange} placeholder="Enter product description" />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        initialValue={price}
        rules={[{ required: true, message: "Please input the product price!" }]}
      >
        <InputNumber
          name="price"
          onChange={(value) => handleChange({ target: { name: "price", value } })}
          placeholder="Enter product price"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Category" name="category" initialValue={category}>
        <Select placeholder="Select category" onChange={handleCategoryChange}>
          {categories.map((cat) => (
            <Option key={cat._id} value={cat._id}>
              {cat.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Subcategories" name="subs" initialValue={subs}>
        <Select
          mode="multiple"
          placeholder="Select subcategories"
          onChange={(value) => handleChange({ target: { name: "subs", value } })}
        >
          {subOptions.map((sub) => (
            <Option key={sub._id} value={sub._id}>
              {sub.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Quantity" name="quantity" initialValue={quantity}>
        <InputNumber
          name="quantity"
          onChange={(value) => handleChange({ target: { name: "quantity", value } })}
          placeholder="Enter product quantity"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Shipping" name="shipping" initialValue={shipping}>
        <Select
          onChange={(value) => handleChange({ target: { name: "shipping", value } })}
        >
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Color" name="color" initialValue={color}>
        <Select
          placeholder="Select color"
          onChange={(value) => handleChange({ target: { name: "color", value } })}
        >
          {colors.map((col) => (
            <Option key={col} value={col}>
              {col}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Brand" name="brand" initialValue={brand}>
        <Select
          placeholder="Select brand"
          onChange={(value) => handleChange({ target: { name: "brand", value } })}
        >
          {brands.map((b) => (
            <Option key={b} value={b}>
              {b}
            </Option>
          ))}
        </Select>
      </Form.Item>

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

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Save Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductCreateForm;
