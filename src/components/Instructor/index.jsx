import PropType from "prop-types";
import { useEffect, useState } from "react";
import LectureList from "../LectureList";
import LectureForm from "../LectureForm";
import classes from "./Instructor.module.css";

const getLectures = async (instructorId, signal) => {
  try {
    const response = await fetch(
      `http://localhost:3000/instructors/${instructorId}/lectures`,
      {
        signal,
        credentials: "include",
      }
    );
    if (!response.ok) {
      return null;
    }
    const lectures = await response.json();
    return lectures;
  } catch (err) {
    if (err.name === "AbortError") {
      return null;
    }
    throw err;
  }
};

function Instructor({ id, name }) {
  const [lectureFormIsOpen, setLectureFormIsOpen] = useState(false);
  const [lecturesOfInstructor, setLecturesOfInstructor] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const fetchAndSetLectures = async () => {
      const lectures = await getLectures(id, controller.signal);
      if (!lectures) return;
      setLecturesOfInstructor(lectures);
    };
    fetchAndSetLectures();
    return () => {
      controller.abort();
    };
  }, [id]);
  const toggleLectureForm = () => {
    setLectureFormIsOpen(!lectureFormIsOpen);
  };
  const handleAddingNewLecture = (lecture) => {
    setLecturesOfInstructor([...lecturesOfInstructor, lecture]);
  };
  return (
    <article className={classes.instructor}>
      <p className={classes["instructor-name"]}>{name}</p>
      <LectureList lectures={lecturesOfInstructor} />
      <button
        className={classes["toggle-form-btn"]}
        onClick={toggleLectureForm}
        type="button"
      >
        {lectureFormIsOpen ? "Close" : "Open"} Lecture Form
      </button>
      {lectureFormIsOpen && (
        <LectureForm
          onAddingNewLecture={handleAddingNewLecture}
          instructorId={id}
        />
      )}
    </article>
  );
}

Instructor.propTypes = {
  id: PropType.number,
  name: PropType.string,
};

export default Instructor;
