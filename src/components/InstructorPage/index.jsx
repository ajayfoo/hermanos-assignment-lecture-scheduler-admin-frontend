import { useState } from "react";
import { useEffect } from "react";
import Instructor from "../Instructor";
import classes from "./InstructorPage.module.css";

const getAllInstructors = async (signal) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/instructors`,
      {
        signal,
        credentials: "include",
      }
    );
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

function InstructorPage() {
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
  return (
    <div className={classes.instructors}>
      {instructors.map((i) => (
        <Instructor key={i.id} id={i.id} name={i.name} />
      ))}
    </div>
  );
}

export default InstructorPage;
