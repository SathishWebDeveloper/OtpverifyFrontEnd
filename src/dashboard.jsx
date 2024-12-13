import React, { useEffect, useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const { data } = await api.get("/dashboard");
        setMessage(data.message);
      } catch (err) {
        console.error("Failed to fetch protected data:", err);
      }
    };
    fetchProtectedData();
  }, []);

  return (
    <div>
      <div>{message || "Loading..."}</div>
      <div>
        <button onClick={() => navigate("/protected")}>
          {" "}
          navigate to protected{" "}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
