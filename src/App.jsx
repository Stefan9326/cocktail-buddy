import Axios from "axios";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ResultTile from "./components/ResultTille/ResultTile";

function App() {
  const fetchResults = async (query) => {
    try {
      const response = await Axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <SearchBar fetchResults={fetchResults} />
      <ResultTile />
    </div>
  );
}

export default App;
