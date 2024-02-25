import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Axios from "axios";
import IngredientDropdown from "./components/SearchBar/IngredientDropdown";
import ResultsContainer from "./components/ResultsContainer/ResultsContainer";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [results, setResults] = useState([]);
  const [resultsDisplayLimit, setResultsDisplayLimit] = useState(10);
  // Necessary to keep track of the selected ingredient for each dropdown and change dropdownValues accordingly
  const [dropdownIds, setDropdownIds] = useState([1]);
  // Values of the dropdowns, used to fetch the results
  const [dropdownValues, setDropdownValues] = useState({});

  useEffect(() => {
    const fetchIngredientsList = async () => {
      let ingredients = localStorage.getItem("ingredients");

      if (!ingredients) {
        try {
          const response = await Axios.get(
            "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
          );
          localStorage.setItem(
            "ingredients",
            JSON.stringify(response.data.drinks)
          );
        } catch (error) {
          console.error(error);
        }
      } else {
        ingredients = JSON.parse(ingredients).map(
          (ingredient) => ingredient.strIngredient1
        );
      }
      setIngredientsList(ingredients);
    };
    fetchIngredientsList();
  }, []);

  // This will be replaced by useQueries hook below
  const fetchResults = async () => {
    try {
      const response = await Axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${dropdownValues[1]}`
      );
      console.log(response);
      setResults(response.data.drinks);
    } catch (error) {
      console.error(error);
    }
  };

  // This needs to be finished. It first fetches results based on ingredients selected.
  // I think this needs to be moved into the handleSearchClick function so that it only executes onClick.
  // const queryResults = useQueries({
  //   queries: Object.values(dropdownValues).map((ingredient) => {
  //     return {
  //       queryKey: ["results", ingredient],
  //       queryFn: () => {
  //         return Axios.get(
  //           `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
  //         );
  //       },
  //     };
  //   }),
  // });

  const handleSearchClick = () => {
    console.log(dropdownValues);
    setResultsDisplayLimit(10);
    fetchResults();
  };

  const addIngredient = () => {
    setDropdownIds([...dropdownIds, dropdownIds.length + 1]);
  };

  const showMoreResults = () => {
    setResultsDisplayLimit(resultsDisplayLimit + 10);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {dropdownIds.map((id) => (
          <IngredientDropdown
            key={id}
            id={id}
            dropdownValues={dropdownValues}
            setDropdownValues={setDropdownValues}
            ingredientsList={ingredientsList}
          />
        ))}
        <button id="add-ingr-btn" onClick={addIngredient}>
          Add ingredient
        </button>
        <button id="search-btn" onClick={handleSearchClick}>
          Search
        </button>
        <ResultsContainer
          results={results}
          resultsLimit={resultsDisplayLimit}
        />
        {results && results.length > 0 && (
          <button onClick={showMoreResults}>Show more</button>
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
