import { useState } from "react";

const NameSearch = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <input value={inputValue} onChange={handleChange} type="text" placeholder="Search for cocktails by name..." />
    </>
  );
};

export default NameSearch;
