import { PropTypes } from "prop-types";
import { fetchData } from "../../utils/api";
import { useFetchData } from "@hooks";
import { NameSearchResultTile } from "@components";

const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

export const NameSearchResults = ({ userInput }) => {
  const { isLoading, isSuccess, results } = useFetchData(["cocktails", userInput], () => fetchData(baseUrl, userInput));

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="results-container">
      {isSuccess &&
        (results ? (
          results.map((result) => <NameSearchResultTile key={result.idDrink} result={result} />)
        ) : (
          <p>No results found</p>
        ))}
    </div>
  );
};

NameSearchResults.propTypes = {
  userInput: PropTypes.string.isRequired,
};
