import { PropTypes } from "prop-types";
import { fetchData } from "../../utils/api";
import useFetchData from "../../hooks/useFetchData";

const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const NameSearchResults = ({ userInput }) => {
  const { isLoading, isSuccess, results } = useFetchData(["cocktails", userInput], () => fetchData(baseUrl, userInput));

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="results-container">
      {isSuccess &&
        (results ? (
          results.map((result) => {
            return (
              // This will be ResultTile once I have refactored to allow it to be reusable in different contexts
              <div key={result.idDrink}>
                <h3>{result.strDrink}</h3>
                <img src={result.strDrinkThumb} alt={`Photo of ${result.strDrink}`} />
              </div>
            );
          })
        ) : (
          <p>No results found</p>
        ))}
    </div>
  );
};

NameSearchResults.propTypes = {
  userInput: PropTypes.string.isRequired,
};

export default NameSearchResults;
