import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { register } from "../../context/apiCalls";
import "./register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    register({ name, email, password }, dispatch);
  };

  return (
    <div className="container">
      <form>
        <h1>Sign In</h1>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
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
        <button className="loginButton" onClick={handleRegister}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Register;
