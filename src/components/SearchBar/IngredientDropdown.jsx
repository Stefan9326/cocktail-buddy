import PropTypes from "prop-types";
import "./IngredientDropdown.css";

const IngredientDropdown = ({
  ingredientsList,
  dropdownValue,
  setDropdownValue,
}) => {
  const handleChange = (event) => {
    setDropdownValue(event.target.value);
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
  dropdownValue: PropTypes.string.isRequired,
  setDropdownValue: PropTypes.func.isRequired,
  ingredientsList: PropTypes.array.isRequired,
};

export default IngredientDropdown;
