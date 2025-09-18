// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = ({ backendUrl = import.meta.env.VITE_BACKEND_URL }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const res = await fetch(`${backendUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.msg || "Error al iniciar sesión");
        return;
      }
      // guarda token en sessionStorage
      sessionStorage.setItem("token", data.access_token);
      sessionStorage.setItem("email", data.email);
      navigate("/private");
    } catch (error) {
      setErr("Error de red");
    }
  };

  return (
    <div className="container mt-4" style={{maxWidth: 460}}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input className="form-control" type="email" value={email}
                 onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input className="form-control" type="password" value={password}
                 onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        {err && <div className="alert alert-danger">{err}</div>}
        <button className="btn btn-primary" type="submit">Entrar</button>
      </form>
    </div>
  );
};
