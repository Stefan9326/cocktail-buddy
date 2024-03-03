import { useState } from "react";
import NameSearchResults from "../components/NameSearchResults/NameSearchResults";

const NameSearch = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <input value={inputValue} onChange={handleChange} type="text" placeholder="Search for cocktails by name..." />
      <NameSearchResults userInput={inputValue} />
    </>
  );
};

export default NameSearch;
