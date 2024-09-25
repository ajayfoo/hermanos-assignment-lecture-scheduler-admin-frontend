import Lecture from "../Lecture";
import PropType from "prop-types";
import classes from "./LectureList.module.css";

function LectureList({ lectures }) {
  if (lectures.length === 0) {
    return null;
  }
  return (
    <section className={classes["lecture-list"]}>
      <header>
        <p>Lectures</p>
      </header>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Course</th>
            <th>Batch</th>
            <th>Date</th>
          </tr>
        </thead>
        {lectures.map((l) => (
          <Lecture
            key={l.id}
            courseName={l.courseName}
            batchName={l.batchName}
            date={l.date}
          />
        ))}
      </table>
    </section>
  );
}

LectureList.propTypes = {
  lectures: PropType.arrayOf(PropType.object),
};

export default LectureList;
