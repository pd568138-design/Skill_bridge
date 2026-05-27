import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

function Learners() {

  const [learner, setLearner] = useState({
    name: "",
    email: "",
    skill: ""
  });

  const [learners, setLearners] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [matchedMentors, setMatchedMentors] = useState([]);
  const [searched, setSearched] = useState(false);

  const API = "http://localhost:5000/api/learners";

  // =========================
  // 🔄 LOAD FROM BACKEND
  // =========================
  useEffect(() => {
    loadLearners();
    setMentors(JSON.parse(localStorage.getItem("mentors")) || []);
  }, []);

  const loadLearners = async () => {
    try {
      const res = await axios.get(API);
      setLearners(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // 📝 HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    setLearner({ ...learner, [e.target.name]: e.target.value });
  };

  // =========================
  // ➕ ADD LEARNER
  // =========================
  const addLearnerHandler = async () => {
    if (!learner.name || !learner.skill) {
      alert("Fill all fields");
      return;
    }

    try {
      await axios.post(API, {
        ...learner,
        connectedMentors: []
      });

      setLearner({ name: "", email: "", skill: "" });
      loadLearners(); // refresh UI
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // 🔍 SEARCH MENTORS
  // =========================
  const searchMentors = (skill) => {
    const result = mentors.filter((m) =>
      m.skill.toLowerCase().includes(skill.toLowerCase())
    );

    setMatchedMentors(result);
    setSearched(true);
  };

  // =========================
  // 🤝 CONNECT MENTOR (LOCAL ONLY)
  // =========================
  const connectMentor = (learnerId, mentor) => {

    const updated = learners.map((l) => {
      if (l._id === learnerId) {
        return {
          ...l,
          connectedMentors: [
            ...(l.connectedMentors || []),
            mentor.name
          ]
        };
      }
      return l;
    });

    setLearners(updated);
    alert(`${mentor.name} Connected`);
  };

  // =========================
  // 🗑 DELETE LEARNER
  // =========================
  const deleteLearnerHandler = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      loadLearners();
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // 🎯 UI
  // =========================
  return (
    <div className="main-container">
      <Sidebar />

      <div className="content">

        <div className="top-section">
          <h1>Learner Hub 🎓</h1>
          <p>Manage learners and connect mentors</p>
        </div>

        {/* FORM */}
        <div className="mentor-form">

          <input
            name="name"
            placeholder="Learner Name"
            value={learner.name}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={learner.email}
            onChange={handleChange}
          />

          <select
            name="skill"
            value={learner.skill}
            onChange={handleChange}
          >
            <option value="">Select Skill</option>
            <option>React</option>
            <option>Node JS</option>
            <option>DSA</option>
            <option>DBMS</option>
            <option>Java</option>
            <option>Python</option>
          </select>

          <button className="save-btn" onClick={addLearnerHandler}>
            Add Learner
          </button>

        </div>

        {/* SEARCH */}
        <div className="search-box">

          <input
            placeholder="Search mentors by skill"
            value={learner.skill}
            onChange={handleChange}
          />

          <button onClick={() => searchMentors(learner.skill)}>
            🔍 Search
          </button>

        </div>

        {/* LEARNERS LIST */}
        <div className="challenge-grid">

          {learners.map((item) => (
            <div className="challenge-card" key={item._id}>

              <div className="badge">{item.skill}</div>

              <h3>{item.name}</h3>

              <p>📧 {item.email}</p>
              <p>📚 Skill: {item.skill}</p>

              <p>
                🤝 Mentors: {item.connectedMentors?.length || 0}
              </p>

              <div className="mentor-actions">

                <button
                  className="small-btn connect-btn"
                  onClick={() => searchMentors(item.skill)}
                >
                  🔍 Search Mentors
                </button>

                <button
                  className="small-btn delete-btn"
                  onClick={() => deleteLearnerHandler(item._id)}
                >
                  🗑 Delete
                </button>

              </div>

              <h4>Connected Mentors</h4>

              {item.connectedMentors?.map((m, i) => (
                <p key={i}>👨‍🏫 {m}</p>
              ))}

            </div>
          ))}

        </div>

        {/* MATCHED MENTORS */}
        {searched && (
          <>
            <h2>Matching Mentors</h2>

            <div className="challenge-grid">

              {matchedMentors.map((mentor) => (
                <div className="challenge-card" key={mentor.id}>

                  <div className="badge">{mentor.skill}</div>

                  <h3>{mentor.name}</h3>

                  <p>📧 {mentor.email}</p>
                  <p>💼 {mentor.experience}</p>

                  <button
                    className="connect-btn"
                    onClick={() =>
                      connectMentor(learners[0]?._id, mentor)
                    }
                  >
                    🤝 Connect
                  </button>

                </div>
              ))}

            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Learners;