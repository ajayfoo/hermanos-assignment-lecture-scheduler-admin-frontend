import { useEffect, useState } from "react";
import Course from "../Course";
import CourseForm from "../CourseForm";

const getAllCourses = async (signal) => {
  try {
    const response = await fetch("http://localhost:3000/courses", {
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
      <h1>Courses</h1>
      <button onClick={toggleCourseForm} type="button">
        {courseFormIsOpen ? "Close" : "Open"} Course Form
      </button>
      {courseFormIsOpen && (
        <CourseForm onAddingNewCourse={handleAddingNewCourse} />
      )}
      {courses.map((c) => (
        <Course
          key={c.id}
          name={c.name}
          level={c.level}
          description={c.description}
          imageUrl={c.imageUrl}
        />
      ))}
    </div>
  );
}

export default CoursePage;
