import PropType from "prop-types";
import classes from "./Lecture.module.css";
function Lecture({ courseName, batchName, date }) {
  const formattedDate = date.split("T")[0];
  return (
    <tr className={classes.lecture}>
      <td>{courseName}</td>
      <td>{batchName}</td>
      <td>{formattedDate}</td>
    </tr>
  );
}

Lecture.propTypes = {
  courseName: PropType.string,
  batchName: PropType.string,
  date: PropType.string,
};

export default Lecture;
