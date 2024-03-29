import { useState } from "react";
import { memo } from "react";
import { useFetchCocktailInfo } from "@hooks";
import { useContext } from "react";
import { IngredientSearchContext } from "@routes/IngredientSearch";
import PropTypes from "prop-types";
import "./IngredientSearchResultTile.css";

export const IngredientSearchResultTile = memo(function ResultTile({ result, noExactResults }) {
  const [recipeDisplayed, setRecipeDisplayed] = useState(false);
  const { dropdowns } = useContext(IngredientSearchContext);
  const { cocktailInfo, isSuccess, ingredients, matchedIngredients } = useFetchCocktailInfo(result, dropdowns);

  const toggleRecipeDisplay = () => {
    setRecipeDisplayed(!recipeDisplayed);
  };

  return (
    <div className="result-tile">
      <div className="initial-info">
        {result.strDrink}
        {noExactResults &&
          matchedIngredients.map((ingredient) => {
            return (
              <p className="matched-ingredient" key={ingredient}>
                {ingredient}
              </p>
            );
          })}
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
