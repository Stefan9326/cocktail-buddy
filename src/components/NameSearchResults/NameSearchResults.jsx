import { PropTypes } from "prop-types";

const NameSearchResults = ({ userInput }) => {
  return <p>{userInput}</p>;
};

NameSearchResults.propTypes = {
  userInput: PropTypes.string.isRequired,
};

export default NameSearchResults;
