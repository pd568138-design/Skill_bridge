import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import {
  getChallenges,
  addChallenge,
  deleteChallenge
} from "../api/challengeApi";
function Challenges() {

  const navigate = useNavigate();
  const [learners, setLearners] = useState([]);

  const [form, setForm] = useState({
    name: "",
    skill: ""
  });

  useEffect(() => {
    setLearners(JSON.parse(localStorage.getItem("learners")) || []);
  }, []);

  // ➕ ADD LEARNER
  const addLearner = () => {
    if (!form.name || !form.skill) return alert("Fill all");

    const newLearner = {
      ...form,
      id: Date.now(),
      coins: 0,
      status: "Not Started"
    };

    const updated = [...learners, newLearner];

    setLearners(updated);
    localStorage.setItem("learners", JSON.stringify(updated));

    setForm({ name: "", skill: "" });
  };

  // 🗑 DELETE
  const deleteLearner = (id) => {
    const updated = learners.filter(l => l.id !== id);
    setLearners(updated);
    localStorage.setItem("learners", JSON.stringify(updated));
  };

  // ▶️ CONTINUE → QUIZ PAGE
  const goQuiz = (learner) => {
    localStorage.setItem("activeLearner", JSON.stringify(learner));
    navigate("/quiz");
  };

  return (
    <div className="main-container">
      <Sidebar />

      <div className="content">

        <h1>🎯 Challenges</h1>

        {/* FORM */}
        <div className="profile-form">

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <select
            value={form.skill}
            onChange={(e) =>
              setForm({ ...form, skill: e.target.value })
            }
          >
            <option value="">Skill</option>
            <option>DSA</option>
            <option>React</option>
            <option>Java</option>
            <option>Python</option>
          </select>

          <button onClick={addLearner}>
            Add
          </button>

        </div>

        {/* LIST */}
        <div className="challenge-grid">

          {learners.map(l => (
            <div className="challenge-card" key={l.id}>

              <h3>{l.name}</h3>
              <p>Skill: {l.skill}</p>
              <p>Coins: 🪙 {l.coins}</p>

              <button onClick={() => goQuiz(l)}>
                ▶ Continue
              </button>

              <button onClick={() => deleteLearner(l.id)}>
                🗑 Delete
              </button>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Challenges;   