import React from "react";

const AutocompleteList = ({ suggestions, handleSelect }) => {
  return (
    <ul className="autocomplete-list">
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          className="autocomplete-item"
          onClick={() => handleSelect(suggestion)}
        >
          {suggestion.title}
        </li>
      ))}
    </ul>
  );
};

export default AutocompleteList;
