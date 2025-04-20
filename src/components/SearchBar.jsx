import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      value={input}
      onChange={handleChange}
      placeholder="Search products..."
      className="w-full p-3 border border-[#D0B9A7] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#714329]"
    />
  );
};

export default SearchBar;
