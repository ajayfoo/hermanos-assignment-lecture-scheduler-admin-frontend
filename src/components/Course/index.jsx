import PropType from "prop-types";

function Course({ name, level, description, imageUrl }) {
  return (
    <article>
      <p>Name: {name}</p>
      <p>Level: {level}</p>
      <p>Description: {description}</p>
      <img src={imageUrl} alt="course" />
    </article>
  );
}

Course.propTypes = {
  name: PropType.string,
  level: PropType.string,
  description: PropType.string,
  imageUrl: PropType.string,
};

export default Course;
