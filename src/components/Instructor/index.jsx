import PropType from "prop-types";

function Instructor({ name }) {
  return <p>{name}</p>;
}

Instructor.propTypes = {
  name: PropType.string,
};

export default Instructor;
