import { useDrinksToDisplay } from "../../hooks/useDrinksToDisplay";
import PropTypes from "prop-types";
import ResultTile from "../ResultTile/ResultTile";
import "./ResultsContainer.css";

const ResultsContainer = ({ results, resultsLimit, dropdowns }) => {
  const { drinksToDisplay, noExactResults } = useDrinksToDisplay(results);

  return (
    <div className="results-container">
      {noExactResults && <p>No exact results found</p>}
      {drinksToDisplay.slice(0, resultsLimit).map((result) => {
        return (
          <ResultTile key={result.idDrink} result={result} noExactResults={noExactResults} dropdowns={dropdowns} />
        );
      })}
    </div>
  );
};

ResultsContainer.propTypes = {
  dropdowns: PropTypes.array.isRequired,
  results: PropTypes.array.isRequired,
  resultsLimit: PropTypes.number.isRequired,
};

export default ResultsContainer;
