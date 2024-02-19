import PropTypes from "prop-types";
import ResultTile from "../ResultTile/ResultTile";
import "./ResultsContainer.css";

const ResultsContainer = ({ results }) => {
  return (
    <div className="results-container">
      {results.slice(0, 10).map((result) => {
        return <ResultTile key={result.idDrink} result={result} />;
      })}
    </div>
  );
};

ResultsContainer.propTypes = {
  results: PropTypes.array.isRequired,
};

export default ResultsContainer;
