import PropTypes from "prop-types";
import ResultTile from "../ResultTile/ResultTile";
import "./ResultsContainer.css";

const ResultsContainer = ({ results, resultsLimit }) => {
  const findCommonDrinks = (results) => {
    const commonDrinksCount = {};
    if (results.length > 0) {
      results.forEach((result) => {
        result.forEach((drink) => {
          if (commonDrinksCount[drink.strDrink]) {
            commonDrinksCount[drink.strDrink]++;
          } else {
            commonDrinksCount[drink.strDrink] = 1;
          }
        });
      });
      const commonDrinks = Object.keys(commonDrinksCount).filter(
        (drink) => commonDrinksCount[drink] === results.length
      );
      console.log(
        results[0].filter((drink) => commonDrinks.includes(drink.strDrink))
      );
      return results[0].filter((drink) =>
        commonDrinks.includes(drink.strDrink)
      );
    }
  };

  return (
    <div className="results-container">
      {results.length ? (
        findCommonDrinks(results)
          .slice(0, resultsLimit)
          .map((result) => {
            return <ResultTile key={result.idDrink} result={result} />;
          })
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

ResultsContainer.propTypes = {
  results: PropTypes.array.isRequired,
  resultsLimit: PropTypes.number.isRequired,
};

export default ResultsContainer;
