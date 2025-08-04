import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [latest, setLatest] = useState(null);
  const [alerts, setAlerts] = useState([]);

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");

      fetch("http://localhost:5050/api/machine", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then((machineData) => {
          setLatest(machineData);

          const newAlerts = [];
          if (machineData.temperature > 50)
            newAlerts.push("🔥 Overheating! Temperature is too high.");
          if (machineData.rpm > 1400) newAlerts.push("⚠️ RPM too high!");
          if (machineData.voltage < 210 || machineData.voltage > 240)
            newAlerts.push("⚡ Voltage out of safe range!");

          setAlerts(newAlerts);

          setData((prev) => [
            ...prev.slice(-19),
            {
              time: new Date(machineData.timestamp).toLocaleTimeString(),
              temperature: parseFloat(machineData.temperature),
              rpm: parseFloat(machineData.rpm),
              voltage: parseFloat(machineData.voltage),
              vibration: parseFloat(machineData.vibration),
              power: parseFloat(machineData.power),
            },
          ]);
        })
        .catch((err) => {
          console.error("❌ Error fetching machine data:", err.message);
          setAlerts([
            "❌ Unable to fetch data. Please login or check your token.",
          ]);
        });
    }, 2000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Arial",
        background: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        🛠️ MechSense Dashboard
      </h1>
      <h2 style={{ fontSize: "1.5rem", marginTop: "2rem" }}>
        Voltage Over Time
      </h2>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={[200, 250]} />
        <Tooltip />
        <Line type="monotone" dataKey="voltage" stroke="#82ca9d" />
      </LineChart>

      <h2 style={{ fontSize: "1.5rem", marginTop: "2rem" }}>
        Vibration Over Time
      </h2>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="vibration" stroke="#ffc658" />
      </LineChart>
      {user && (
        <div style={{ marginBottom: "1rem" }}>
          <p>
            <strong>Logged in as:</strong> {user.email}
          </p>
          <p>
            <strong>User ID:</strong> {user.id}
          </p>
        </div>
      )}

      {latest && (
        <div style={{ marginBottom: "2rem" }}>
          <p>
            <strong>Current Temperature:</strong> {latest.temperature} °C
          </p>
          <p>
            <strong>RPM:</strong> {latest.rpm}
          </p>
          <p>
            <strong>Status:</strong> {latest.status}
          </p>
          <p>
            <strong>Last Updated:</strong>{" "}
            {new Date(latest.timestamp).toLocaleTimeString()}
          </p>
        </div>
      )}
      {alerts.length > 0 && (
        <div
          style={{
            background: "#ffe4e1",
            padding: "1rem",
            marginBottom: "1.5rem",
            borderRadius: "8px",
            color: "darkred",
          }}
        >
          <h3>⚠️ Alerts:</h3>
          <ul>
            {alerts.map((alert, index) => (
              <li key={index}>{alert}</li>
            ))}
          </ul>
        </div>
      )}

      <h2 style={{ fontSize: "1.5rem" }}>Temperature Over Time</h2>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Dashboard;
