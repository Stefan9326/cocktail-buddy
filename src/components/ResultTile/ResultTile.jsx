import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCocktailById } from "../../api";
import PropTypes from "prop-types";
import "./ResultTile.css";

const ResultTile = ({ result, noExactResults, dropdowns }) => {
  const [recipeDisplayed, setRecipeDisplayed] = useState(false);

  const toggleRecipeDisplay = () => {
    setRecipeDisplayed(!recipeDisplayed);
  };

  const { data: cocktailInfo } = useQuery({
    queryKey: ["ingredients", result.idDrink],
    queryFn: fetchCocktailById(result),
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const ingredients = Object.keys(cocktailInfo ?? {})
    .filter((key) => key.startsWith("strIngredient") && cocktailInfo[key])
    .map((key) => cocktailInfo[key])
    .map((ingredient) => ingredient[0] + ingredient.slice(1).toLowerCase());

  console.log(ingredients);

  const matchedIngredients = dropdowns
    .map(
      (dropdown) => dropdown.value[0] + dropdown.value.slice(1).toLowerCase()
    )
    .filter((value) => ingredients.includes(value));

  return (
    <div className="result-tile">
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
        {recipeDisplayed && (
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
    </div>
  );
};

ResultTile.propTypes = {
  result: PropTypes.object.isRequired,
  noExactResults: PropTypes.bool.isRequired,
  dropdowns: PropTypes.array.isRequired,
};

export default ResultTile;
