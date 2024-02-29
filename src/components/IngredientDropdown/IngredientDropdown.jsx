import { memo } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import "./IngredientDropdown.css";

const IngredientDropdown = memo(function IngredientDropdown({ id, ingredients, updateDropdownValue }) {
  const [dropdownValue, setDropdownValue] = useState("");

  const handleChange = (event) => {
    setDropdownValue(event.target.value);
    updateDropdownValue(id, event.target.value);
  };

  return (
    <div className="search-bar">
      <form action="get">
        <select value={dropdownValue} onChange={handleChange} name="ingredient">
          <option value="" disabled>
            Choose an ingredient
          </option>
          {ingredients.map((ingredient) => {
            return (
              <option key={ingredient.strIngredient1} value={ingredient.strIngredient1}>
                {ingredient.strIngredient1}
              </option>
            );
          })}
        </select>
      </form>
    </div>
  );
});

IngredientDropdown.propTypes = {
  id: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  updateDropdownValue: PropTypes.func.isRequired,
};

export default IngredientDropdown;
