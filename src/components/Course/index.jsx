import PropType from "prop-types";
import BatchForm from "../BatchForm";
import { useEffect, useState } from "react";

const getBatches = async (courseId, signal) => {
  try {
    const response = await fetch(
      `http://localhost:3000/courses/${courseId}/batches`,
      {
        signal,
        credentials: "include",
      }
    );
    if (!response.ok) {
      return null;
    }
    const batches = await response.json();
    return batches;
  } catch (err) {
    if (err.name === "AbortError") {
      return null;
    }
    throw err;
  }
};

function Course({ name, level, description, imageUrl, id }) {
  const [batchFormIsOpen, setBatchFormIsOpen] = useState(false);
  const [batches, setBatches] = useState([]);
  const toggleBatchForm = () => {
    setBatchFormIsOpen(!batchFormIsOpen);
  };
  useEffect(() => {
    const controller = new AbortController();
    const fetchAndSetLectures = async () => {
      const batches = await getBatches(id, controller.signal);
      if (!batches) return;
      setBatches(batches);
    };
    fetchAndSetLectures();
    return () => {
      controller.abort();
    };
  }, [id]);
  const handleAddingNewBatch = (newBatch) => {
    setBatches([...batches, newBatch]);
  };
  return (
    <article>
      <p>Name: {name}</p>
      <p>Level: {level}</p>
      <p>Description: {description}</p>
      <img src={imageUrl} alt="course" />
      {batches.map((b) => (
        <p key={b.id}>{b.name}</p>
      ))}
      <button onClick={toggleBatchForm} type="button">
        {batchFormIsOpen ? "Close" : "Open"} Batch Form
      </button>
      {batchFormIsOpen && (
        <BatchForm courseId={id} onAddingNewBatch={handleAddingNewBatch} />
      )}
    </article>
  );
}

Course.propTypes = {
  name: PropType.string,
  level: PropType.string,
  description: PropType.string,
  imageUrl: PropType.string,
  id: PropType.string,
};

export default Course;
