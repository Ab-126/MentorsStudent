import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { login } from "../../context/apiCalls";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

  return (
    <div className="container">
      <form>
        <h1>Sign In</h1>
        <input
          type="email"
          placeholder="test@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginButton" onClick={handleLogin}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
