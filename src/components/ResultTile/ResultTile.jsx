import PropTypes from "prop-types";
import "./ResultTile.css";

const ResultTile = ({ result }) => {
  return (
    <div className="result-tile">
      {result.strDrink}
      <img src={result.strDrinkThumb} alt={`Photo of ${result.strDrink}`} />
    </div>
  );
};

ResultTile.propTypes = {
  result: PropTypes.object.isRequired,
};

export default ResultTile;
