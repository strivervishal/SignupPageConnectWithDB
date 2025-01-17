import React, { useEffect, useState } from "react";
import axios from "axios";

const WelcomePage = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://signup-page-connect-with-db-44f3.vercel.app/api/auth/welcome",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Session expired. Please log in again.");
        window.location.href = "/login";
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">
        Welcome, {userData.name || "User"}! 🎉
      </h1>
      <p>Email: {userData.email}</p>
    </div>
  );
};

export default WelcomePage;
