import { useState } from "react";
import { memo } from "react";
import { useFetchCocktailInfo } from "@hooks";
import PropTypes from "prop-types";
import "./IngredientSearchResultTile.css";

export const IngredientSearchResultTile = memo(function ResultTile({ result, noExactResults, dropdowns }) {
  const [recipeDisplayed, setRecipeDisplayed] = useState(false);
  const { cocktailInfo, isSuccess, ingredients, matchedIngredients } = useFetchCocktailInfo(result, dropdowns);

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
        <>
          <ul>
            {ingredients.map((ingredient, index) => {
              return (
                <li key={ingredient + index}>
                  {ingredient}
                  {cocktailInfo[`strMeasure${index + 1}`]}
                </li>
              );
            })}
          </ul>
          <p>{cocktailInfo["strInstructions"]}</p>
        </>
      )}
    </div>
  );
});

IngredientSearchResultTile.propTypes = {
  result: PropTypes.object.isRequired,
  noExactResults: PropTypes.bool.isRequired,
  dropdowns: PropTypes.array.isRequired,
};
