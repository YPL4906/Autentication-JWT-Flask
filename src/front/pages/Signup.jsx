import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = ({ backendUrl = import.meta.env.VITE_BACKEND_URL }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      const res = await fetch(`${backendUrl}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.status === 201) {
        navigate("/login");
        return;
      }
      setMsg(data.msg || "Error en el registro");
    } catch (err) {
      setMsg("Error de red");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 460 }}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {msg && <div className="alert alert-info">{msg}</div>}
        <button type="submit" className="btn btn-success">
          Registrarse
        </button>
      </form>
    </div>
  );
};
