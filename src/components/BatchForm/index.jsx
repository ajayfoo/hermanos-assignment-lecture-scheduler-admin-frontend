import { useState } from "react";
import PropType from "prop-types";

const postNewBatch = async (name, courseId) => {
  courseId = parseInt(courseId);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/courses/${courseId}/batches`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, courseId }),
        credentials: "include",
      }
    );
    if (response.ok) {
      const batchId = await response.text();
      return batchId;
    }
    return null;
  } catch {
    console.error("something went wrong");
    return null;
  }
};

function BatchForm({ courseId, onAddingNewBatch }) {
  const [name, setName] = useState("");
  const nameFieldId = courseId + "-new-batch-name";
  const handleNameInput = async (e) => {
    setName(e.target.value);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newBathId = await postNewBatch(name, courseId);
    if (newBathId === null) return;
    const newBatch = {
      id: newBathId,
      name,
    };
    onAddingNewBatch(newBatch);
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
      <button>Add</button>
    </form>
  );
}

BatchForm.propTypes = {
  courseId: PropType.string,
  onAddingNewBatch: PropType.func,
};

export default BatchForm;
