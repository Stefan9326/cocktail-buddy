import { useState } from "react";
import { memo } from "react";
import { useCocktailInfo } from "../../hooks/useCocktailInfo";
import PropTypes from "prop-types";
import "./ResultTile.css";

export const ResultTile = memo(function ResultTile({ result, noExactResults, dropdowns }) {
  const [recipeDisplayed, setRecipeDisplayed] = useState(false);
  const { cocktailInfo, isSuccess, ingredients, matchedIngredients } = useCocktailInfo(result, dropdowns);

  const toggleRecipeDisplay = () => {
    setRecipeDisplayed(!recipeDisplayed);
  };

  return (
    <div className="result-tile">
      <div className="initial-info">
        {result.strDrink}
        {noExactResults && (
          <p>
            Matched ingredients:{" "}
            <em>
              <strong>{matchedIngredients.join(", ")}</strong>
            </em>
          </p>
        )}
        <div className="right">
          <img src={result.strDrinkThumb} alt={`Photo of ${result.strDrink}`} />
          <button onClick={toggleRecipeDisplay}>Show recipe</button>
        </div>
      </div>
      {recipeDisplayed && isSuccess && (
        <div>
          <ul>
            {ingredients.map((ingredient, index) =>
              ingredient ? (
                <li key={ingredient + index}>
                  {ingredient}
                  {cocktailInfo[`strMeasure${index + 1}`]}
                </li>
              ) : null
            )}
          </ul>
          <p>{cocktailInfo["strInstructions"]}</p>
        </div>
      )}
    </div>
  );
});

ResultTile.propTypes = {
  result: PropTypes.object.isRequired,
  noExactResults: PropTypes.bool.isRequired,
  dropdowns: PropTypes.array.isRequired,
};
