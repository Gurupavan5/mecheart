// import React, { useEffect, useState } from "react";
// import Dashboard from "./components/Dashboard";
// import Register from "./components/Register";
// function App() {
//   const [data, setData] = useState({});

//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetch("http://localhost:5000/api/machine")
//         .then((res) => res.json())
//         .then(setData);
//     }, 2000); // Poll every 2 sec

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div style={{ padding: "2rem", fontFamily: "Arial" }}>
//       <h1>MechSense Dashboard</h1>
//       <Dashboard />
//       <Register />
//       <Login />
//       <p>Temperature: {data.temperature} °C</p>
//       <p>RPM: {data.rpm}</p>
//       <p>Status: {data.status}</p>
//       <p>Time: {new Date(data.timestamp).toLocaleTimeString()}</p>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "1rem", background: "#eee" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>
          Dashboard
        </Link>
        <Link to="/register" style={{ marginRight: "1rem" }}>
          Register
        </Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
