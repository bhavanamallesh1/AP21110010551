// ProductDetails.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // For making HTTP requests

function ProductDetails() {
  // State variables
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get product ID from URL params
  const { id } = useParams();

  // Fetch product details from backend API
  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    }

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      {/* Display product details */}
      <h2>{product.name}</h2>
      <p>Company: {product.company}</p>
      <p>Category: {product.category}</p>
      {/* Add more details here */}
    </div>
  );
}

export default ProductDetails;
