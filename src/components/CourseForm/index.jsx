import PropType from "prop-types";
import { useState } from "react";

const postNewCourse = async (name, level, description) => {
  try {
    const response = await fetch(`http://localhost:3000/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        level,
        description,
        imageUrl: "",
      }),
    });
    if (response.ok) {
      const courseId = await response.text();
      return courseId;
    }
    return null;
  } catch {
    console.error("something went wrong");
    return null;
  }
};

function CourseForm({ onAddingNewCourse }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");

  const nameFieldId = "new-course-name";
  const levelFieldId = "new-course-level";
  const descriptionFieldId = "new-course-description";
  const handleNameInput = async (e) => {
    setName(e.target.value);
  };
  const handleLevelInput = async (e) => {
    setLevel(e.target.value);
  };
  const handleDescriptionInput = async (e) => {
    setDescription(e.target.value);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newCourseId = await postNewCourse(name, level, description);
    if (newCourseId === null) return;
    const newCourse = {
      id: newCourseId,
      name,
      level,
      description,
    };
    onAddingNewCourse(newCourse);
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <section className="field">
        <label htmlFor={nameFieldId}>Name</label>
        <input
          required
          onInput={handleNameInput}
          value={name}
          type="text"
          id={nameFieldId}
        />
      </section>
      <section className="field">
        <label htmlFor={levelFieldId}>Level</label>
        <input
          required
          onInput={handleLevelInput}
          value={level}
          type="text"
          id={levelFieldId}
        />
      </section>
      <section className="field">
        <label htmlFor={descriptionFieldId}>Description</label>
        <textarea
          required
          onInput={handleDescriptionInput}
          value={description}
          type="text"
          id={descriptionFieldId}
        />
      </section>
      <button>Add</button>
    </form>
  );
}

CourseForm.propTypes = {
  onAddingNewCourse: PropType.func,
};

export default CourseForm;
