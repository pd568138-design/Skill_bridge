import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import {
  getMentors,
  addMentor,
  deleteMentor
} from "../api/mentorApi";

function Mentors() {

  const [mentor, setMentor] = useState({
    name: "",
    email: "",
    contact: "",
    skill: "",
    experience: ""
  });

  const [mentors, setMentors] = useState([]);
  const [searchSkill, setSearchSkill] = useState("");
  const [filteredMentors, setFilteredMentors] = useState([]);

  // LOAD FROM BACKEND
  useEffect(() => {
    loadMentors();
  }, []);

  const loadMentors = async () => {
    try {

      const res = await getMentors();

      setMentors(res.data);
      setFilteredMentors(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // HANDLE INPUT
  const handleChange = (e) => {

    setMentor({
      ...mentor,
      [e.target.name]: e.target.value
    });

  };

  // ADD MENTOR
  const saveMentor = async () => {

    if (
      mentor.name === "" ||
      mentor.skill === ""
    ) {
      alert("Fill all fields");
      return;
    }

    try {

      await addMentor({
        ...mentor,
        learners: []
      });

      setMentor({
        name: "",
        email: "",
        contact: "",
        skill: "",
        experience: ""
      });

      loadMentors();

    } catch (err) {
      console.log(err);
    }

  };

  // SEARCH
  const searchMentors = () => {

    if (searchSkill === "") {

      setFilteredMentors(mentors);
      return;

    }

    const result = mentors.filter((m) =>
      m.skill
        .toLowerCase()
        .includes(searchSkill.toLowerCase())
    );

    setFilteredMentors(result);

  };

  // CONNECT
  const connectMentor = (mentorObj) => {

    alert(
      `${mentorObj.name} Connected Successfully`
    );

  };

  // DELETE
  const deleteMentorHandler = async (id) => {

    try {

      await deleteMentor(id);

      loadMentors();

    } catch (err) {
      console.log(err);
    }

  };

  return (

    <div className="main-container">

      <Sidebar />

      <div className="content">

        <div className="top-section">

          <h1>
            Mentor Hub 👨‍🏫
          </h1>

          <p>
            Add, Search and Connect Mentors
          </p>

        </div>

        {/* FORM */}
        <div className="mentor-form">

          <input
            type="text"
            name="name"
            placeholder="Mentor Name"
            value={mentor.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={mentor.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={mentor.contact}
            onChange={handleChange}
          />

          <select
            name="skill"
            value={mentor.skill}
            onChange={handleChange}
          >

            <option value="">
              Select Skill
            </option>

            <option>
              React
            </option>

            <option>
              Node JS
            </option>

            <option>
              DSA
            </option>

            <option>
              DBMS
            </option>

            <option>
              Java
            </option>

            <option>
              Python
            </option>

          </select>

          <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={mentor.experience}
            onChange={handleChange}
          />

          <button
            className="save-btn"
            onClick={saveMentor}
          >
            Save Mentor
          </button>

        </div>

        {/* SEARCH */}
        <div className="search-box">

          <input
            type="text"
            placeholder="Search Skill"
            value={searchSkill}
            onChange={(e)=>
              setSearchSkill(
                e.target.value
              )
            }
          />

          <button
            onClick={searchMentors}
          >
            Search
          </button>

        </div>

        {/* MENTOR LIST */}
        <div className="challenge-grid">

          {
            filteredMentors.map(
              (item)=>(

              <div
                className="challenge-card"
                key={item._id}
              >

                <div className="badge">
                  {item.skill}
                </div>

                <h3>
                  {item.name}
                </h3>

                <p>
                  📧 {item.email}
                </p>

                <p>
                  📞 {item.contact}
                </p>

                <p>
                  💼 {item.experience}
                </p>

                <p>
                  👨‍🎓 Learners:
                  {
                    item.learners
                    ?.length || 0
                  }
                </p>

                <div
                  className="mentor-actions"
                >

                  <button
                    className="small-btn connect-btn"
                    onClick={()=>
                      connectMentor(
                        item
                      )
                    }
                  >
                    🤝 Connect
                  </button>

                  <button
                    className="small-btn delete-btn"
                    onClick={()=>
                      deleteMentorHandler(
                        item._id
                      )
                    }
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </div>

  );

}

export default Mentors;