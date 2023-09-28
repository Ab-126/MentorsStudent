import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Video from "./pages/Video/Video";
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <Router>
      <Routes>
        <Route path="/register" element={!user ? <Register /> : <Video />} />
        <Route path="/login" element={!user ? <Login /> : <Video />} />
        <Route path="/" element={user ? <Video /> : <Register />} />
      </Routes>
    </Router>
  );
}

export default App;
