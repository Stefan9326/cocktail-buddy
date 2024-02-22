import { useState, useEffect } from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import "./ResultTile.css";

const ResultTile = ({ result }) => {
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

  return (
    <div className="result-tile">
      {result.strDrink}
      <div className="right">
        <img src={result.strDrinkThumb} alt={`Photo of ${result.strDrink}`} />
        <button onClick={toggleRecipeDisplay}>Show recipe</button>
        {recipeDisplayed && (
          <div>
            <p>{cocktailInfo["strInstructions"]}</p>
          </div>
        )}
      </div>
    </div>
  );
};

ResultTile.propTypes = {
  result: PropTypes.object.isRequired,
};

export default ResultTile;
