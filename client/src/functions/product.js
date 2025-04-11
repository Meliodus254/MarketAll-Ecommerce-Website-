import { getAuth } from "firebase/auth"; // Import only the auth module
import axios from "axios";

export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      Authorization: `Bearer ${authtoken}`,
    },
  });

 

  export const listProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/products`);
      return response.data; // List of all products
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };



// Get product details by ID
export const readProduct = async (productId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/product/${productId}`);
    return response.data; // Return product details
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error; // You can also handle this in the UI if needed
  }
};

// Admin approves a product
export const approveProduct = async (productId, authtoken) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API}/admin/product/approve/${productId}`,
      {},  // Empty body
      {
        headers: {
          Authorization: `Bearer ${authtoken}`,  // Authorization header with token
        },
      }
    );
    return response.data;  // Return the response after approval
  } catch (error) {
    console.error("Error approving product:", error);
    throw error;  // Ensure errors are thrown for handling in the component
  }
};



// Admin rejects (deletes) a product
export const rejectProduct = async (productId, authtoken) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/admin/product/reject/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${authtoken}`, // Passing JWT token for admin authentication
        },
      }
    );
    return response.data; // Return the response after deletion
  } catch (error) {
    console.error("Error rejecting (deleting) product:", error);
    throw error;
  }
};

// Fetch seller's products (Added to match your original request)

export const fetchSellerProducts = async (authtoken) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/zuplo/sell`,
      {
        headers: {
          Authorization: `Bearer ${authtoken}`,
        },
      }
    );
    return response.data;  // Return the response containing approved and unapproved products
  } catch (error) {
    console.error("Error fetching seller products:", error);
    throw error;  // Ensure errors are thrown for handling in the component
  }
};

// Fetch unapproved products for admin review

export const fetchUnapprovedProducts = async () => {
  try {
    const auth = getAuth(); // Initialize Firebase Auth
    const user = auth.currentUser;

    if (!user) {
      console.error("No user is currently authenticated.");
      alert("You are not authenticated. Please log in.");
      return null;
    }

    const token = await user.getIdToken(); // Get the ID token
    console.log("Token being sent:", token);

    const response = await axios.get(`${process.env.REACT_APP_API}/admin/products/unapproved`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching unapproved products:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      alert("Unauthorized! Please log in again.");
    } else {
      alert("Something went wrong while fetching products. Please try again later.");
    }
  }
};


export const fetchApprovedProducts = async () => {
  try {
    const auth = getAuth(); // Initialize Firebase Auth
    const user = auth.currentUser;

    if (!user) {
      console.error("No user is currently authenticated.");
      alert("You are not authenticated. Please log in.");
      return null;
    }

    const token = await user.getIdToken(); // Get the ID token
    console.log("Token being sent:", token);

    const response = await axios.get(`${process.env.REACT_APP_API}/admin/products/approved`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching approved products:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      alert("Unauthorized! Please log in again.");
    } else {
      alert("Something went wrong while fetching products. Please try again later.");
    }
  }
};



export const updateProduct = async (slug, formValues, authtoken) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API}/product/${slug}`,
      formValues,
      {
        headers: {
          Authorization: `Bearer ${authtoken}`, // Passing JWT token for authentication
        },
      }
    );
    return response.data; // Return the updated product details
  } catch (error) {
    console.error("Error updating product:", error.response?.data || error.message);
    throw error; // Ensure the error is handled in the calling function
  }
};


export const getProd = async (slug) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
    return response;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error; // Propagate the error to the calling function
  }
};




export const getProducts = async (sort, order, page) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API}/products`, {
      sort,
      order,
      page,
    });
    return response.data;  // Returns the data from the response
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;  // Rethrow or handle the error as needed
  }
};



export const getProductsCount = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/products/total`);
    return response.data;  // Returns the product count
  } catch (error) {
    console.error('Error fetching product count:', error);
    throw error;  // Rethrow or handle the error as needed
  }
};



export const getProductsByCount = async (count) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
    return response.data;  // Returns the list of products
  } catch (error) {
    console.error(`Error fetching ${count} products:`, error);
    throw error;  // Rethrow or handle the error as needed
  }
};




export const fetchProducts = async ({ sort, order, page, limit, category, search } = {}) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/fetch-products`, {
      params: { sort, order, page, limit, category, search },
    });

    // Return only the products array (response.data.data)
    return response.data.data; 
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};