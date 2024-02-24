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
  const [ingredientDropdowns, setIngredientDropdowns] = useState([]);
  const [dropdownValue, setDropdownValue] = useState("");

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

  const fetchResults = async () => {
    try {
      const response = await Axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${dropdownValue}`
      );
      console.log(response);
      setResults(response.data.drinks);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    setResultsDisplayLimit(10);
    fetchResults();
  };

  const addIngredient = () => {
    const newDropdown = (
      <IngredientDropdown
        dropdownValue={dropdownValue}
        setDropdownValue={setDropdownValue}
        ingredientsList={ingredientsList}
      />
    );
    setIngredientDropdowns([...ingredientDropdowns, newDropdown]);
  };

  const showMoreResults = () => {
    setResultsDisplayLimit(resultsDisplayLimit + 10);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <IngredientDropdown
          dropdownValue={dropdownValue}
          setDropdownValue={setDropdownValue}
          ingredientsList={ingredientsList}
        />
        {ingredientDropdowns.map((dropdown) => dropdown)}
        <button id="add-ingr-btn" onClick={addIngredient}>
          Add ingredient
        </button>
        <button id="search-btn" onClick={handleClick}>
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
