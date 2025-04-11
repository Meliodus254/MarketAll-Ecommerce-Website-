import axios from "axios";

// Helper function to set the Authorization header
const getAuthHeader = (authtoken) => ({
  headers: {
    Authorization: `Bearer ${authtoken}`,
  },
});

// Fetch all subcategories
export const getSubs = async () => {
  const url = `${process.env.REACT_APP_API}/subs`;
  console.log("Request URL: ", url); // Log the URL
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
};

// Fetch a single subcategory by slug
export const getSub = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

// Remove a subcategory by slug (requires auth)
export const removeSub = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, getAuthHeader(authtoken));

// Update a subcategory by slug (requires auth)
export const updateSub = async (slug, sub, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, getAuthHeader(authtoken));

// Create a new subcategory (requires auth)
export const createSub = async (sub, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/sub`, sub, getAuthHeader(authtoken));
