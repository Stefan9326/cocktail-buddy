import PropTypes from "prop-types";
import "./ResultTile.css";

const ResultTile = ({ result }) => {
  return <div className="result-tile">{result.strDrink}</div>;
};

ResultTile.propTypes = {
  result: PropTypes.object.isRequired,
};

export default ResultTile;
