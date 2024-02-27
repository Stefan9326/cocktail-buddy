import { useState, useEffect } from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import "./ResultTile.css";

const ResultTile = ({ result, noExactResults, dropdowns }) => {
  const [cocktailInfo, setCocktailInfo] = useState([]);
  const [recipeDisplayed, setRecipeDisplayed] = useState(false);

  useEffect(() => {
    const fetchCocktailById = async () => {
      try {
        const response = await Axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${result.idDrink}`
        );
        setCocktailInfo(response.data.drinks[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCocktailById();
  }, [result.idDrink]);

  const toggleRecipeDisplay = () => {
    setRecipeDisplayed(!recipeDisplayed);
  };

  const ingredients = Object.keys(cocktailInfo)
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
