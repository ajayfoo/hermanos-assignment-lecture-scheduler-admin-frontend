import { useEffect, useState } from "react";
import Course from "../Course";

const getAllCourses = async (signal) => {
  try {
    const response = await fetch("http://localhost:3000/courses", {
      signal,
    });
    if (!response.ok) {
      return null;
    }
    const allCourses = await response.json();
    return allCourses;
  } catch (err) {
    if (err.name === "AbortError") {
      return null;
    }
    throw err;
  }
};

function CoursePage() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const fetchAndSetInstructors = async () => {
      const allInstructors = await getAllCourses(controller.signal);
      if (!allInstructors) return;
      setCourses(allInstructors);
    };
    fetchAndSetInstructors();
    return () => {
      controller.abort();
    };
  }, []);
  return courses.map((c) => <Course key={c.id} name={c.name} />);
}

export default CoursePage;
