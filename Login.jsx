import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

  const [name,setName] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {

    if(name===""){
      alert("Enter name");
      return;
    }

    localStorage.setItem("studentName",name);

    navigate("/dashboard");

  };

  return(

    <div className="login-container">

      <div className="login-box">

        <h1>SkillBridge</h1>

        <p>Student Collaboration Platform</p>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

      </div>

    </div>

  );
}

export default Login;