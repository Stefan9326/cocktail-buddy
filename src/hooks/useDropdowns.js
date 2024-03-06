import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useDropdowns = () => {
  const [dropdowns, setDropdowns] = useState([{ id: uuidv4(), value: "" }]);

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

  return { dropdowns, addDropdown, deleteDropdown, updateDropdownValue };
};
