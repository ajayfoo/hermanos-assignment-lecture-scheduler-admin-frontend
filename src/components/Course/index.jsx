import PropType from "prop-types";

function Course({ name }) {
  return <p>{name}</p>;
}

Course.propTypes = {
  name: PropType.string,
};

export default Course;
