import PropType from "prop-types";

function Lecture({ courseName, batchName, date }) {
  return (
    <section>
      <p>{courseName}</p>
      <p>{batchName}</p>
      <p>{date}</p>
    </section>
  );
}

Lecture.propTypes = {
  courseName: PropType.string,
  batchName: PropType.string,
  date: PropType.string,
};

export default Lecture;
