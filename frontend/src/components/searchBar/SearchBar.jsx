import React, { useState, useRef, useEffect } from "react";
import { companyNames } from "../../common/data/searchData";
import Notification, {
  handleNotification,
} from "../../common/Notification/Notification";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const suggestionsRef = useRef(null);

  // Event handler for input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Filter company names based on the input value
    const filteredCompanies = companyNames.filter((company) =>
      company.toLowerCase().includes(value.toLowerCase())
    );
    setIsSuggestionsVisible(true);
    setSuggestions(filteredCompanies);
  };

  // Event handler for suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    onSearch(suggestion);
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const lowerCaseCompanyNames = companyNames.map((company) =>
      company.toLowerCase()
    );
    if (lowerCaseCompanyNames.includes(query.toLowerCase())) {
      onSearch(companyNames[lowerCaseCompanyNames.indexOf(query)]);
    } else {
      handleNotification(`${query} is not listed`, "error", setNotification);
    }
  };

  // Event handler for clicks outside the suggestion panel
  const handleClickOutside = (e) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
      setIsSuggestionsVisible(false);
    }
  };

  useEffect(() => {
    // Attach event listener when component mounts
    document.addEventListener("click", handleClickOutside);

    // Detach event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="relative text-black">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="border border-gray-300 rounded-md px-4 py-2 mr-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Search
      </button>

      {suggestions.length > 0 && isSuggestionsVisible && (
        <ul
          ref={suggestionsRef}
          className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
    </form>
  );
};

export default SearchBar;
