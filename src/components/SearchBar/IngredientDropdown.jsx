import { useState } from "react";
import PropTypes from "prop-types";
import "./IngredientDropdown.css";

const IngredientDropdown = ({
  id,
  data,
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
          {data.map((ingredient) => {
            return (
              <option
                key={ingredient.strIngredient1}
                value={ingredient.strIngredient1}
              >
                {ingredient.strIngredient1}
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
  data: PropTypes.array,
};

export default IngredientDropdown;
