import PropType from "prop-types";
import { useEffect, useState } from "react";

const getAllCourses = async (signal) => {
  try {
    const response = await fetch("http://localhost:3000/courses", {
      signal,
    });
    if (!response.ok) {
      return null;
    }
    const courses = await response.json();
    return courses;
  } catch (err) {
    if (err.name === "AbortError") {
      return null;
    }
    throw err;
  }
};

const getAllBatchesOfCourseId = async (id, signal) => {
  try {
    const response = await fetch(
      `http://localhost:3000/courses/${id}/batches`,
      {
        signal,
      }
    );
    if (!response.ok) {
      return null;
    }
    const courses = await response.json();
    return courses;
  } catch (err) {
    if (err.name === "AbortError") {
      return null;
    }
    throw err;
  }
};

function LectureForm({ instructorId }) {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const courseFieldId = instructorId + "-form-course";
  const batchFieldId = instructorId + "-form-batch";
  const dateFieldId = instructorId + "-form-date";
  useEffect(() => {
    const controller = new AbortController();
    const fetchAndSetCourses = async () => {
      const allCourses = await getAllCourses(controller.signal);
      if (!allCourses) return;
      setCourses(allCourses);
      if (allCourses.length !== 0) {
        setSelectedCourseId(allCourses[0].id);
      }
    };
    fetchAndSetCourses();
    return () => {
      controller.abort();
    };
  }, []);
  useEffect(() => {
    if (selectedCourseId === "") return;
    const controller = new AbortController();
    const fetchAndSetBatches = async () => {
      const allBatches = await getAllBatchesOfCourseId(
        selectedCourseId,
        controller.signal
      );
      if (!allBatches) return;
      setBatches(allBatches);
    };
    fetchAndSetBatches();
    return () => {
      controller.abort();
    };
  }, [selectedCourseId]);
  const handleCourseChanged = (e) => {
    setSelectedCourseId(e.target.value);
  };
  const handleBatchChanged = (e) => {
    setSelectedBatchId(e.target.value);
  };
  return (
    <form>
      <section className="field">
        <label htmlFor={courseFieldId}>Course</label>
        <select
          value={selectedCourseId}
          required
          id={courseFieldId}
          onChange={handleCourseChanged}
        >
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </section>
      <section className="field">
        <label htmlFor={batchFieldId}>Batch</label>
        <select
          value={selectedBatchId}
          required
          id={batchFieldId}
          onChange={handleBatchChanged}
        >
          {batches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </section>
      <section className="field">
        <label htmlFor={dateFieldId}>Date</label>
        <input required type="date" id={dateFieldId} />
      </section>
    </form>
  );
}

LectureForm.propTypes = {
  instructorId: PropType.number,
};

export default LectureForm;
