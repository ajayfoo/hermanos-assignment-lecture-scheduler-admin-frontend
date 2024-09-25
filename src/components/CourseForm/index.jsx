import PropType from "prop-types";
import { useState } from "react";

const postNewCourse = async (name, level, description, image) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("level", level);
  formData.append("description", description);
  formData.append("image", image);
  try {
    const response = await fetch(`http://localhost:3000/courses`, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const courseIdAndImageUrl = await response.json();
      return courseIdAndImageUrl;
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
  const [image, setImage] = useState("");

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
    const courseIdAndImageUrl = await postNewCourse(
      name,
      level,
      description,
      image
    );
    if (courseIdAndImageUrl === null) return;
    const newCourse = {
      id: courseIdAndImageUrl.id,
      name,
      level,
      description,
      imageUrl: courseIdAndImageUrl.imageUrl,
    };
    onAddingNewCourse(newCourse);
  };
  const handleImageChange = (e) => {
    if (e.target.files.length === 0) {
      setImage("");
      return;
    }
    setImage(e.target.files[0]);
  };
  return (
    <form encType="multipart/form-date" onSubmit={handleFormSubmit}>
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
      <section className="field">
        <input required onChange={handleImageChange} type="file" id="image" />
      </section>
      <button>Add</button>
    </form>
  );
}

CourseForm.propTypes = {
  onAddingNewCourse: PropType.func,
};

export default CourseForm;
