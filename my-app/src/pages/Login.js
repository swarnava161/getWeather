import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Call the login function from AuthContext with email and password
      await login(email, password);

      // Redirect to the desired page after successful login
      // You can use the `useNavigate` hook or `history.push` to navigate to another page
      navigate("/"); // Replace '/dashboard' with the desired route
    } catch (error) {
      // Handle error, if any
      setError("Invalid credentials");
      console.error(error);
    }
  };

  return (
    <div
      className="container mt-5 text-white p-5"
      style={{ minHeight: "100vh" }}
    >
      <h2
        className="text-center py-2 "
        style={{
          backgroundImage: "linear-gradient(to right, red, orange)",
          backgroundSize: "100% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "2px 2px 4px rgba(555, 555, 555, 0.3)",
        }}
      >
        Login
      </h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div
        className="container  d-flex flex-column justify-content-center p-5 border border-white rounded-2"
        style={{ backgroundColor: "rgba(0,0,0,0.8" }}
      >
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-outline-light ">
            Login
          </button>
        </form>
      </div>
      <p className="text-center mt-3 p-3">
        Create New Account? <Link to="/Signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
