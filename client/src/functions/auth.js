import axios from "axios";

// Function to create or update a user
export const createOrUpdateUser = async (authtoken, userData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/create-or-update-user`, // API endpoint
      userData, // Pass user data
      {
        headers: {
          Authorization: `Bearer ${authtoken}`, // Pass token in the Authorization header
        },
      }
    );
    return response.data; // Return response data
  } catch (error) {
    console.error("Error creating/updating user:", error.response?.data || error.message);
    throw error; // Re-throw the error to handle it elsewhere
  }
};

// Function to get current user details
export const currentUser = async (authtoken) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/current-user`,
      {},  // Empty object as body (or you could pass actual data if needed)
      {
        headers: {
          Authorization: `Bearer ${authtoken}`,  // Include token with Authorization header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error.response?.data || error.message);
    throw error;
  }
};

// Function to get current admin details
export const currentAdmin = async (authtoken) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/current-admin`,
      {},  // Empty object as body (or you could pass actual data if needed)
      {
        headers: {
          Authorization: `Bearer ${authtoken}`,  // Include token with Authorization header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching current admin:", error.response?.data || error.message);
    throw error;
  }
};



export const updateUserDetails = async (userDetails, authtoken) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API}/update-user`, // API endpoint for updating user details
      userDetails, // Pass user details as the body of the request
      {
        headers: {
          Authorization: `Bearer ${authtoken}`, // Include the token for authentication
        },
      }
    );
    return response.data; // Return the API response
  } catch (error) {
    console.error("Error updating user details:", error.response?.data || error.message);
    throw error; // Rethrow the error for further handling
  }
};