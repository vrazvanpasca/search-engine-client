import React, { useState, useEffect, useRef } from "react";
import { database } from "./data";
import AutocompleteList from "./AutocompleteList";
import SearchResults from "./SearchResults";

const SearchEngine = () => {
  const [inputValue, setInputValue] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState([]); // State for autocomplete suggestions.
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const inputRef = useRef(null);

  const addToSearchHistory = (query) => {
    setSearchHistory((prevHistory) => [...prevHistory, query]);
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === "") {
      setAutocompleteResults([]);
    } else {
      const suggestions = database
        .filter((entry) =>
          entry.title.toLowerCase().startsWith(value.toLowerCase())
        )
        .slice(0, 10);
      setAutocompleteResults(suggestions);
    }
  };

  const handleSearch = () => {
    const searchQuery = inputValue.toLowerCase();
    const results = database.filter((entry) =>
      entry.title.toLowerCase().includes(searchQuery)
    );
    setSearchResults(results);
    addToSearchHistory(searchQuery); // Add the query to the search history.
  };

  const handleSelect = (selectedSuggestion) => {
    setInputValue(selectedSuggestion.title);
    setAutocompleteResults([]);
  };

  const handleInputFocus = () => {
    if (autocompleteResults.length > 0) {
      setAutocompleteResults(autocompleteResults); // Show the autocomplete results in memory.
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setAutocompleteResults([]);
    }, 200);
  };

  const removeFromSearchHistory = (queryToRemove) => {
    setSearchHistory((prevHistory) =>
      prevHistory.filter((query) => query !== queryToRemove)
    );
  };

  useEffect(() => {
    if (autocompleteResults.length > 0 || !inputValue) {
      inputRef.current.focus();
    }
  }, [autocompleteResults, inputValue]);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
      />
      <button onClick={handleSearch}>Search</button> {/* Add a Search button */}
      {autocompleteResults.length > 0 && (
        <AutocompleteList
          suggestions={autocompleteResults.slice(0, 10)}
          handleSelect={handleSelect}
        />
      )}
      <SearchResults
        results={searchResults}
        searchHistory={searchHistory}
        removeFromSearchHistory={removeFromSearchHistory}
      />
    </div>
  );
};

export default SearchEngine;
