import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function Quiz() {

  const navigate = useNavigate();

  const [learner, setLearner] = useState(null);
  const [index, setIndex] = useState(0);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("activeLearner"));
    setLearner(data);
  }, []);

  // 🎯 FULL QUESTION BANK (10 each)
  const questions = {

    DSA: [
      { q: "Stack follows?", options: ["FIFO", "LIFO", "Both", "None"], a: "LIFO" },
      { q: "Binary search complexity?", options: ["O(n)", "O(log n)", "O(n2)", "O(1)"], a: "O(log n)" },
      { q: "Queue follows?", options: ["LIFO", "FIFO", "Tree", "Graph"], a: "FIFO" },
      { q: "Array index starts?", options: ["0", "1", "2", "None"], a: "0" },
      { q: "Linked list uses?", options: ["Nodes", "Tables", "Rows", "Cols"], a: "Nodes" },
      { q: "Tree traversal type?", options: ["DFS", "BFS", "Both", "None"], a: "Both" },
      { q: "Hashing used for?", options: ["Search", "Sort", "Delete", "Print"], a: "Search" },
      { q: "Stack overflow means?", options: ["Full", "Empty", "Crash", "None"], a: "Full" },
      { q: "Graph has?", options: ["Nodes", "Edges", "Both", "None"], a: "Both" },
      { q: "Heap used for?", options: ["Priority", "Sort", "Queue", "List"], a: "Priority" }
    ],

    React: [
      { q: "React is?", options: ["Library", "Framework", "DB", "OS"], a: "Library" },
      { q: "JSX stands for?", options: ["JS XML", "Java Syntax", "None", "JSX Lang"], a: "JS XML" },
      { q: "React uses?", options: ["Virtual DOM", "Real DOM", "DB", "API"], a: "Virtual DOM" },
      { q: "Hook example?", options: ["useState", "useDB", "useSQL", "useAPI"], a: "useState" },
      { q: "Props are?", options: ["Input", "Output", "DB", "Style"], a: "Input" },
      { q: "React built by?", options: ["Google", "Facebook", "Microsoft", "Apple"], a: "Facebook" },
      { q: "State means?", options: ["Data", "Style", "DB", "File"], a: "Data" },
      { q: "React extension?", options: ["JSX", "HTML", "CSS", "SQL"], a: "JSX" },
      { q: "Component is?", options: ["Reusable UI", "DB", "API", "Server"], a: "Reusable UI" },
      { q: "React type?", options: ["Frontend", "Backend", "DB", "OS"], a: "Frontend" }
    ],

    Java: [
      { q: "Java is?", options: ["OOP", "DB", "OS", "Network"], a: "OOP" },
      { q: "Java extension?", options: [".java", ".py", ".js", ".c"], a: ".java" },
      { q: "JVM means?", options: ["Virtual Machine", "Code Editor", "DB", "OS"], a: "Virtual Machine" },
      { q: "Inheritance used for?", options: ["Reuse", "Delete", "Print", "Sort"], a: "Reuse" },
      { q: "Java platform?", options: ["Cross", "Single", "None", "Web"], a: "Cross" },
      { q: "Compile output?", options: ["Bytecode", "Text", "Image", "Exe"], a: "Bytecode" },
      { q: "Keyword for class?", options: ["class", "struct", "define", "let"], a: "class" },
      { q: "Main method?", options: ["Entry", "Exit", "DB", "API"], a: "Entry" },
      { q: "Java memory?", options: ["Heap", "Disk", "Cache", "ROM"], a: "Heap" },
      { q: "Java type?", options: ["Compiled", "Interpreted", "Both", "None"], a: "Both" }
    ],

    Python: [
      { q: "Python is?", options: ["Language", "DB", "OS", "Compiler"], a: "Language" },
      { q: "Python creator?", options: ["Guido", "Elon", "Bill", "Mark"], a: "Guido" },
      { q: "Indentation used?", options: ["Yes", "No", "Optional", "None"], a: "Yes" },
      { q: "Extension?", options: [".py", ".java", ".c", ".js"], a: ".py" },
      { q: "Python type?", options: ["Interpreted", "Compiled", "Both", "None"], a: "Interpreted" },
      { q: "List is?", options: ["Mutable", "Immutable", "DB", "API"], a: "Mutable" },
      { q: "Loop keyword?", options: ["for", "loop", "repeat", "go"], a: "for" },
      { q: "Function keyword?", options: ["def", "fun", "function", "define"], a: "def" },
      { q: "Python used for?", options: ["AI", "Web", "Both", "None"], a: "Both" },
      { q: "Print function?", options: ["print()", "echo()", "log()", "show()"], a: "print()" }
    ],

    NodeJS: [
      { q: "NodeJS is?", options: ["Runtime", "DB", "OS", "Language"], a: "Runtime" },
      { q: "Node uses?", options: ["JS", "Java", "Python", "C"], a: "JS" },
      { q: "Backend tool?", options: ["Yes", "No", "Maybe", "None"], a: "Yes" },
      { q: "Package manager?", options: ["npm", "pip", "maven", "git"], a: "npm" },
      { q: "Node is?", options: ["Server", "Frontend", "DB", "OS"], a: "Server" },
      { q: "Event driven?", options: ["Yes", "No", "None", "Maybe"], a: "Yes" },
      { q: "File system module?", options: ["fs", "file", "sys", "os"], a: "fs" },
      { q: "Extension?", options: [".js", ".py", ".java", ".c"], a: ".js" },
      { q: "Runs on?", options: ["Server", "Browser", "DB", "OS"], a: "Server" },
      { q: "Built on?", options: ["V8", "Java", "Python", "C"], a: "V8" }
    ],

    DBMS: [
      { q: "SQL used for?", options: ["DB", "UI", "Logic", "Design"], a: "DB" },
      { q: "DB stores?", options: ["Data", "Images", "Code", "OS"], a: "Data" },
      { q: "Primary key?", options: ["Unique", "Duplicate", "Null", "None"], a: "Unique" },
      { q: "SQL full form?", options: ["Structured Query Language", "Simple Query", "None", "System Query"], a: "Structured Query Language" },
      { q: "DB type?", options: ["Relational", "OS", "API", "UI"], a: "Relational" },
      { q: "Table row called?", options: ["Tuple", "Column", "Cell", "File"], a: "Tuple" },
      { q: "Join used for?", options: ["Combine", "Delete", "Sort", "Print"], a: "Combine" },
      { q: "Index used for?", options: ["Speed", "Slow", "Delete", "None"], a: "Speed" },
      { q: "DBMS stands?", options: ["System", "Language", "OS", "Tool"], a: "System" },
      { q: "Query language?", options: ["SQL", "HTML", "CSS", "JS"], a: "SQL" }
    ]
  };

  // 🪙 UPDATE COINS + DASHBOARD DATA
  const updateCoins = (val) => {

    const learners =
      JSON.parse(localStorage.getItem("learners")) || [];

    const updated = learners.map(l => {
      if (l.id === learner.id) {

        const newCoins = (l.coins || 0) + val;

        return {
          ...l,
          coins: newCoins,
          skill: learner.skill,
          status: "completed"
        };
      }
      return l;
    });

    localStorage.setItem("learners", JSON.stringify(updated));
  };

  const checkAnswer = (opt) => {

    const q = questions[learner.skill][index];

    if (opt === q.a) {
      setMsg("correct");
      updateCoins(10);
    } else {
      setMsg("wrong");
      updateCoins(-2);
    }

    setTimeout(() => {

      setMsg("");

      if (index < questions[learner.skill].length - 1) {
        setIndex(index + 1);
      } else {
        alert("Quiz Completed 🎉");

        // update active learner for dashboard
        const learners =
          JSON.parse(localStorage.getItem("learners")) || [];

        const updated = learners.map(l => {
          if (l.id === learner.id) {
            return { ...l, completed: true };
          }
          return l;
        });

        localStorage.setItem("learners", JSON.stringify(updated));

        navigate("/dashboard");
      }

    }, 500);
  };

  if (!learner) return <h2>Loading...</h2>;

  return (
    <div className="main-container">

      <Sidebar />

      <div className="content">

        <h1>{learner.skill} Quiz 🎯</h1>
        <h3>{learner.name}</h3>

        <div className="quiz-card">

          <h2>{questions[learner.skill][index].q}</h2>

          {questions[learner.skill][index].options.map((o, i) => (
            <button
              key={i}
              onClick={() => checkAnswer(o)}
              style={{
                background:
                  msg === "correct"
                    ? "#22c55e"
                    : msg === "wrong"
                    ? "#ef4444"
                    : "#eee"
              }}
            >
              {o}
            </button>
          ))}

          <p>
            {msg === "correct" ? "👍 +10" : msg === "wrong" ? "👎 -2" : ""}
          </p>

        </div>

      </div>
    </div>
  );
}

export default Quiz;