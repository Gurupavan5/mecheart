// // src/components/Login.js
// import React, { useState } from "react";
// import axios from "axios";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5050/api/auth/login", {
//         email,
//         password,
//       });
//       console.log("Login response:", res.data);

//       localStorage.setItem("token", res.data.token); // 🔐 Save token for future API calls

//       setMessage("Login successful!");
//     } catch (err) {
//       console.error("Login error:", err.response?.data);
//       setMessage(err.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>Login</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <br />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <br />
//       <button type="submit">Login</button>
//       <p>{message}</p>
//     </form>
//   );
// }

// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5050/api/auth/login", {
        email,
        password,
      });

      console.log("Login response:", res.data); // 🧠 Debug: see if token is returned

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setMessage("Login successful! Token stored.");
      } else {
        setMessage("No token received.");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data);
      setMessage(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  );
}
