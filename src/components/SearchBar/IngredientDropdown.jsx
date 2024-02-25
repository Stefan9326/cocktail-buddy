import { useState } from "react";
import PropTypes from "prop-types";
import "./IngredientDropdown.css";

const IngredientDropdown = ({
  id,
  ingredientsList,
  dropdownValues,
  setDropdownValues,
}) => {
  const [dropdownValue, setDropdownValue] = useState("");

  const handleChange = (event) => {
    setDropdownValue(event.target.value);
    setDropdownValues({ ...dropdownValues, [id]: event.target.value });
  };

  return (
    <div className="search-bar">
      <form action="get">
        <select value={dropdownValue} onChange={handleChange} name="ingredient">
          <option value="" disabled>
            Choose an ingredient
          </option>
          {ingredientsList.map((ingredient) => {
            return (
              <option key={ingredient} value={ingredient}>
                {ingredient}
              </option>
            );
          })}
        </select>
      </form>
    </div>
  );
};

IngredientDropdown.propTypes = {
  id: PropTypes.number.isRequired,
  dropdownValues: PropTypes.object.isRequired,
  setDropdownValues: PropTypes.func.isRequired,
  ingredientsList: PropTypes.array.isRequired,
};

export default IngredientDropdown;
