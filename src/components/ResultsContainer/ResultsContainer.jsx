import PropTypes from "prop-types";
import ResultTile from "../ResultTile/ResultTile";
import "./ResultsContainer.css";

const ResultsContainer = ({ results, resultsLimit }) => {
  return (
    <div className="results-container">
      {results.slice(0, resultsLimit).map((result) => {
        return <ResultTile key={result.idDrink} result={result} />;
      })}
    </div>
  );
};

ResultsContainer.propTypes = {
  results: PropTypes.array.isRequired,
  resultsLimit: PropTypes.number.isRequired,
};

export default ResultsContainer;
