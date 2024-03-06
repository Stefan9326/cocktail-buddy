import { getDrinksToDisplay } from "@utils";
import { IngredientSearchResultTile } from "@components";
import PropTypes from "prop-types";
import "./IngredientSearchResults.css";

export const IngredientSearchResults = ({ results, resultsLimit, dropdowns }) => {
  const { drinksToDisplay, noExactResults } = getDrinksToDisplay(results);

  return (
    <div className="results-container">
      {noExactResults && <p>No exact results found</p>}
      {drinksToDisplay.slice(0, resultsLimit).map((result) => {
        return (
          <IngredientSearchResultTile
            key={result.idDrink}
            result={result}
            noExactResults={noExactResults}
            dropdowns={dropdowns}
          />
        );
      })}
    </div>
  );
};

IngredientSearchResults.propTypes = {
  dropdowns: PropTypes.array.isRequired,
  results: PropTypes.array.isRequired,
  resultsLimit: PropTypes.number.isRequired,
};
