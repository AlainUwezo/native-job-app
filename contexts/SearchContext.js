// context/SearchContext.js
import React, { createContext, useState, useContext, useCallback } from "react";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    job: "",
    category: "",
    location: "",
  });

  const updateFilters = useCallback((newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  }, []);

  const updateSearchQuery = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        filters,
        updateFilters,
        updateSearchQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
