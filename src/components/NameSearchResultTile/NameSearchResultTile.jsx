import { useState } from "react";
import { memo } from "react";
import { getCocktailIngredients } from "@utils";
import PropTypes from "prop-types";

export const NameSearchResultTile = memo(function ResultTile({ result }) {
  const [recipeDisplayed, setRecipeDisplayed] = useState(false);

  const toggleRecipeDisplay = () => {
    setRecipeDisplayed(!recipeDisplayed);
  };

  const ingredients = getCocktailIngredients(result);

  return (
    <div className="result-tile">
      <div className="initial-info">
        {result.strDrink}
        <div className="right">
          <img src={result.strDrinkThumb} alt={`Photo of ${result.strDrink}`} />
          <button onClick={toggleRecipeDisplay}>Show recipe</button>
        </div>
      </div>
      {recipeDisplayed && (
        <>
          <ul>
            {ingredients.map((ingredient, index) => {
              return (
                <li key={ingredient + index}>
                  {ingredient}
                  {result[`strMeasure${index + 1}`]}
                </li>
              );
            })}
          </ul>
          <p>{result["strInstructions"]}</p>
        </>
      )}
    </div>
  );
});

NameSearchResultTile.propTypes = {
  result: PropTypes.object.isRequired,
};
