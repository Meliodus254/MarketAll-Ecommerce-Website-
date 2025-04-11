import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);

    // Redirect when count reaches 0
    if (count === 0) {
      navigate("/login"); // Redirect to login page
    }

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [count, navigate]);

  return (
    <div className="container p-5 text-center">
      <p>Redirecting you in {count} seconds...</p>
    </div>
  );
};

export default LoadingToRedirect;
