import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function Dashboard() {

  const [learners, setLearners] = useState([]);

  const profile =
    JSON.parse(localStorage.getItem("profileData")) || {};

  const coins =
    Number(localStorage.getItem("coins")) || 0;

  useEffect(() => {

    const loadData = () => {
      const data = JSON.parse(localStorage.getItem("learners")) || [];
      setLearners(data);
    };

    loadData();

    // 🔥 LIVE SYNC FIX
    window.addEventListener("storage", loadData);

    return () => window.removeEventListener("storage", loadData);

  }, []);

  const completed = learners.filter(l => l.status === "completed").length;
  const inProgress = learners.length - completed;

  return (

    <div className="main-container">

      <Sidebar />

      <div className="content">

        {/* HEADER */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          background: "#eef2ff",
          borderRadius: "12px",
          marginBottom: "20px"
        }}>

          <h2 style={{ color: "#1e3a8a" }}>
            Hello {profile.name || "Priya"} 👋
          </h2>

          <div style={{
            background: "#1e3a8a",
            color: "white",
            padding: "10px 16px",
            borderRadius: "10px"
          }}>
            🪙 {coins}
          </div>

        </div>

        {/* STATS */}
        <div className="stats-row">

          <div className="mini-card">
            <h3>Total Learners</h3>
            <p>{learners.length}</p>
          </div>

          <div className="mini-card">
            <h3>Completed</h3>
            <p>{completed}</p>
          </div>

          <div className="mini-card">
            <h3>In Progress</h3>
            <p>{inProgress}</p>
          </div>

        </div>

        {/* SKILLS */}
        <div className="dashboard-card-large">

          <h2>Skills Overview</h2>

          <div className="skills">

            {["React", "DSA", "Java", "Python"].map((s) => (
              <span key={s}>{s}</span>
            ))}

          </div>

        </div>

        {/* RECENT ACTIVITY */}
        <div className="dashboard-card-large">

          <h2>Recent Activity</h2>

          {learners.length === 0 ? (
            <p>No activity yet</p>
          ) : (
            learners.slice(-5).reverse().map((l, i) => (
              <div key={i} style={{
                padding: "10px",
                margin: "8px 0",
                borderLeft: "4px solid #1e3a8a",
                background: "#f8fafc",
                borderRadius: "8px"
              }}>

                <b>{l.name}</b> completed <b>{l.skill}</b>

                <p>
                  🪙 Coins: {l.coins || 0} | Status: {l.status || "pending"}
                </p>

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default Dashboard;