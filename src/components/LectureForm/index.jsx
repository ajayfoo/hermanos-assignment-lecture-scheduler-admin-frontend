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

const postNewLecture = async (instructorId, batchId, date) => {
  try {
    const response = await fetch(`http://localhost:3000/lectures`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        instructorId,
        batchId,
        date,
      }),
    });
    if (response.ok) {
      const lectureId = await response.text();
      return lectureId;
    }
    return null;
  } catch {
    console.error("something went wrong");
    return null;
  }
};

function LectureForm({ instructorId, onAddingNewLecture }) {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [date, setDate] = useState("");
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
      if (allBatches.length !== 0) {
        setSelectedBatchId(allBatches[0].id);
      }
    };
    fetchAndSetBatches();
    return () => {
      controller.abort();
    };
  }, [selectedCourseId]);
  const handleCourseChange = (e) => {
    setSelectedCourseId(e.target.value);
  };
  const handleBatchChange = (e) => {
    setSelectedBatchId(e.target.value);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newLectureId = await postNewLecture(
      instructorId,
      selectedBatchId,
      date
    );
    if (newLectureId === null) return;
    const newLecture = {
      id: newLectureId,
      courseName: courses.find(
        (c) => parseInt(c.id) === parseInt(selectedCourseId)
      ).name,
      batchName: batches.find(
        (b) => parseInt(b.id) === parseInt(selectedBatchId)
      ).name,
      date,
    };
    onAddingNewLecture(newLecture);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <section className="field">
        <label htmlFor={courseFieldId}>Course</label>
        <select
          value={selectedCourseId}
          required
          id={courseFieldId}
          onChange={handleCourseChange}
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
          onChange={handleBatchChange}
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
        <input
          value={date}
          onChange={handleDateChange}
          required
          type="date"
          id={dateFieldId}
        />
      </section>
      <button>Add</button>
    </form>
  );
}

LectureForm.propTypes = {
  onAddingNewLecture: PropType.func,
  instructorId: PropType.number,
};

export default LectureForm;
