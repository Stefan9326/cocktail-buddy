import PropTypes from "prop-types";
import { useState } from "react";
import "./ResultTile.css";

const ResultTile = ({ result }) => {
  const [recipeDisplayed, setRecipeDisplayed] = useState(false);

  const toggleRecipeDisplay = () => {
    setRecipeDisplayed(!recipeDisplayed);
  };

  return (
    <div className="result-tile">
      {result.strDrink}
      <div className="right">
        <img src={result.strDrinkThumb} alt={`Photo of ${result.strDrink}`} />
        <button onClick={toggleRecipeDisplay}>Show recipe</button>
        {recipeDisplayed && <p>RECIPE</p>}
      </div>
    </div>
  );
};

ResultTile.propTypes = {
  result: PropTypes.object.isRequired,
};

export default ResultTile;
