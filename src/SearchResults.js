import React from "react";
import SearchResultItem from "./SearchResultItem";

const SearchResults = ({ results, searchHistory, removeFromSearchHistory }) => {
  return (
    <div>
      <p>Number of results: {results.length}</p>
      <p>Search History:</p>
      <ul>
        {searchHistory.map((query, index) => (
          <li key={index}>
            {query}{" "}
            <button onClick={() => removeFromSearchHistory(query)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      {results.length > 0 ? (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <SearchResultItem result={result} />
              <button onClick={() => removeFromSearchHistory(result.query)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
