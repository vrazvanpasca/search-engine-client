import React from "react";

const SearchResultItem = ({ result }) => {
  return (
    <div className="search-result-item">
      <h2 className="search-result-title">
        <a href={result.url} target="_blank" rel="noopener noreferrer">
          {result.title}
        </a>
      </h2>
      <p className="search-result-description">{result.description}</p>
    </div>
  );
};

export default SearchResultItem;
