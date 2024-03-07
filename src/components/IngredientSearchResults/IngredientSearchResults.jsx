import { useState } from "react";
import { getDrinksToDisplay } from "@utils";
import PropTypes from "prop-types";
import { IngredientSearchResultTile } from "@components";
import "./IngredientSearchResults.css";

export const IngredientSearchResults = ({ results, dropdowns }) => {
  const { drinksToDisplay, noExactResults } = getDrinksToDisplay(results);
  const [resultsDisplayLimit, setResultsDisplayLimit] = useState(10);

  const showMoreResults = () => {
    setResultsDisplayLimit(resultsDisplayLimit + 10);
  };

  return (
    <div className="results-container">
      {noExactResults && (
        <>
          <p>We couldn&apos;t find any cocktails including all of the selected ingredients</p>
          <p>Below you can find cocktails that include one or more of the ingredients you selected</p>
        </>
      )}
      {drinksToDisplay.slice(0, resultsDisplayLimit).map((result) => {
        return (
          <IngredientSearchResultTile
            key={result.idDrink}
            result={result}
            noExactResults={noExactResults}
            dropdowns={dropdowns}
          />
        );
      })}
      <button onClick={showMoreResults}>Show more</button>
    </div>
  );
};

IngredientSearchResults.propTypes = {
  dropdowns: PropTypes.array.isRequired,
  results: PropTypes.array.isRequired,
};
