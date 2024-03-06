import { IngredientDropdown } from "@components";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { IngredientSearchContext } from "@routes/IngredientSearch";

export const DropdownsContainer = () => {
  const { dropdowns, setDropdowns, ingredientsList } = useContext(IngredientSearchContext);

  const addDropdown = () => {
    setDropdowns([...dropdowns, { id: uuidv4(), value: "" }]);
  };

  const deleteDropdown = (id) => {
    setDropdowns(dropdowns.filter((dropdown) => dropdown.id !== id));
  };

  const updateDropdownValue = (id, value) => {
    setDropdowns(
      dropdowns.map((dropdown) => {
        if (dropdown.id === id) {
          return { ...dropdown, value };
        }
        return dropdown;
      })
    );
  };

  return (
    <>
      {ingredientsList &&
        dropdowns.map((dropdown) => (
          <div key={dropdown.id}>
            <IngredientDropdown
              id={dropdown.id}
              updateDropdownValue={updateDropdownValue}
              ingredientsList={ingredientsList}
            />
            {dropdowns.length > 1 && <button onClick={() => deleteDropdown(dropdown.id)}>Delete</button>}
          </div>
        ))}
      {dropdowns[0].value && (
        <>
          <button id="add-ingr-btn" onClick={addDropdown}>
            Add ingredient
          </button>
        </>
      )}
    </>
  );
};
