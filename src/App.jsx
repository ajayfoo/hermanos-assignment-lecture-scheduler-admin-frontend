import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import Instructor from "./components/Instructor";

const getAllInstructors = async (signal) => {
  try {
    const response = await fetch("http://localhost:3000/instructors", {
      signal,
    });
    if (!response.ok) {
      return null;
    }
    const allInstructors = await response.json();
    return allInstructors;
  } catch (err) {
    if (err.name === "AbortError") {
      return null;
    }
    throw err;
  }
};

function App() {
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const fetchAndSetInstructors = async () => {
      const allInstructors = await getAllInstructors(controller.signal);
      if (!allInstructors) return;
      setInstructors(allInstructors);
    };
    fetchAndSetInstructors();
    return () => {
      controller.abort();
    };
  }, []);
  return instructors.map((i) => <Instructor key={i.id} name={i.name} />);
}

export default App;
