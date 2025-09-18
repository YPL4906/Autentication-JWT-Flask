import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const navigate = useNavigate();
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container mt-4">
      <h2>Zona Privada</h2>
      <p>Bienvenido, {email || "usuario desconocido"} 👋</p>
      <p>Solo los usuarios autenticados pueden ver esta página 🚀</p>
    </div>
  );
};
