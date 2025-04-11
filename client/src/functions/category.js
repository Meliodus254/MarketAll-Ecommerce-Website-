import axios from "axios";

// Helper function to set the Authorization header
const getAuthHeader = (authtoken) => ({
  headers: {
    Authorization: `Bearer ${authtoken}`,
  },
});

// Fetch all categories
export const getCategories = async () => {
  const url = `${process.env.REACT_APP_API}/categories`;
  console.log("Request URL: ", url); // Log the URL
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Fetch a specific category by slug
export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

// Fetch subcategories based on category ID
export const getCategorySubs = async (categoryId) => {
  const url = `${process.env.REACT_APP_API}/category/${categoryId}/subs`;
  console.log("Request URL: ", url); // Log the URL
  try {
    const response = await axios.get(url);
    console.log("Subcategories Response:", response.data); // Log the API response
    return response.data; // Return subcategories
  } catch (error) {
    console.error(`Error fetching subcategories for category ID ${categoryId}:`, error);
    throw error;
  }
};

// Remove a category (requires auth)
export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, getAuthHeader(authtoken));

// Update a category (requires auth)
export const updateCategory = async (slug, category, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, getAuthHeader(authtoken));

// Create a new category (requires auth)
export const createCategory = async (category, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/category`, category, getAuthHeader(authtoken));
