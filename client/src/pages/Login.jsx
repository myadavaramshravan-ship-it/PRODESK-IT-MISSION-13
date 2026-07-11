import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await API.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", response.data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    alert("Login Successful");

    navigate("/dashboard");
  } catch (error) {
    alert(error.response?.data?.message || "Login Failed");
  }
};

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>TaskMatrix</h1>
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Login
          </button>
        </form>

        <p>
          Don’t have an account? <a href="/register">Create one</a>
        </p>
      </div>
    </div>
  );
}

export default Login;