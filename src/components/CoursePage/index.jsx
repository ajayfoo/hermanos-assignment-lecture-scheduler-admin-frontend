import { useEffect, useState } from "react";
import Course from "../Course";
import CourseForm from "../CourseForm";
import classes from "./CoursePage.module.css";

const getAllCourses = async (signal) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/courses`, {
      signal,
      credentials: "include",
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
  const [courseFormIsOpen, setCourseFormIsOpen] = useState(false);
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
  const toggleCourseForm = () => {
    setCourseFormIsOpen(!courseFormIsOpen);
  };
  const handleAddingNewCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
  };
  return (
    <div>
      <button
        className={classes["toggle-course-form-btn"]}
        onClick={toggleCourseForm}
        type="button"
      >
        {courseFormIsOpen ? "Close" : "Open"} Course Form
      </button>
      {courseFormIsOpen && (
        <CourseForm onAddingNewCourse={handleAddingNewCourse} />
      )}
      <div className={classes.courses}>
        {courses.map((c) => (
          <Course
            key={c.id}
            name={c.name}
            level={c.level}
            description={c.description}
            imageUrl={c.imageUrl}
            id={c.id}
          />
        ))}
      </div>
    </div>
  );
}

export default CoursePage;
