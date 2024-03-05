import { PropTypes } from "prop-types";
import { fetchData } from "../../utils/api";
import useFetchData from "../../hooks/useFetchData";

const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const NameSearchResults = ({ userInput }) => {
  const { isSuccess, results } = useFetchData(["cocktails", userInput], () => fetchData(baseUrl, userInput));

  if (!isSuccess) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="results-container">
        {results.map((result) => {
          return (
            // This will be ResultTile once I have refactored to allow it to be reusable in different contexts
            <div key={result.idDrink}>
              <h3>{result.strDrink}</h3>
              <img src={result.strDrinkThumb} alt={`Photo of ${result.strDrink}`} />
            </div>
          );
        })}
      </div>
    );
  }
};

NameSearchResults.propTypes = {
  userInput: PropTypes.string.isRequired,
};

export default NameSearchResults;
