import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
    phone: "",
    role: "customer"
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register, loading } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await register(formData.email, formData.password, formData.fullname, formData.phone, formData.role);
    if (result.success) {
      navigate("/login");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="bg-parchment p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-espresso">Register to BSK Solutions</h2>
        {error && <p className="text-sienna mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            className="w-full px-4 py-2 mb-4 border rounded-lg"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 border rounded-lg"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="w-full px-4 py-2 mb-4 border rounded-lg"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="w-full px-4 py-2 mb-4 border rounded-lg"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="password"
            name="password"
            placeholder="Password (min 6 chars)"
            className="w-full px-4 py-2 mb-4 border rounded-lg"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-espresso text-cream py-2 rounded-lg font-semibold hover:bg-mocha disabled:bg-sand"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center text-espresso/80">
          Already have an account? <Link to="/login" className="text-espresso hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
