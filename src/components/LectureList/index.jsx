import Lecture from "../Lecture";
import PropType from "prop-types";

function LectureList({ lectures }) {
  return lectures.map((l) => (
    <Lecture
      key={l.id}
      courseName={l.courseName}
      batchName={l.batchName}
      date={l.date}
    />
  ));
}

LectureList.propTypes = {
  lectures: PropType.arrayOf(PropType.object),
};

export default LectureList;
