import { useState, useEffect } from "react";
import Axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ResultsContainer from "./components/ResultsContainer/ResultsContainer";
import "./App.css";

function App() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [results, setResults] = useState([]);
  const [resultsDisplayLimit, setResultsDisplayLimit] = useState(10);
  const [ingredientDropdowns, setIngredientDropdowns] = useState([]);

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

  const addIngredient = () => {
    const newDropdown = (
      <SearchBar
        setResults={setResults}
        setResultsDisplayLimit={setResultsDisplayLimit}
        ingredientsList={ingredientsList}
      />
    );
    setIngredientDropdowns([...ingredientDropdowns, newDropdown]);
  };

  const showMoreResults = () => {
    setResultsDisplayLimit(resultsDisplayLimit + 10);
  };

  return (
    <div className="App">
      <SearchBar
        setResults={setResults}
        setResultsDisplayLimit={setResultsDisplayLimit}
        ingredientsList={ingredientsList}
      />
      {ingredientDropdowns.map((dropdown) => dropdown)}
      <button onClick={addIngredient}>Add ingredient</button>
      <ResultsContainer results={results} resultsLimit={resultsDisplayLimit} />
      {results && results.length > 0 && (
        <button onClick={showMoreResults}>Show more</button>
      )}
    </div>
  );
}

export default App;
