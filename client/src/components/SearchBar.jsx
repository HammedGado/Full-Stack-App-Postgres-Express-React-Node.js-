import { useState } from "react";

function SearchBar({ onSearch, onCategoryFilter, onSort, categories }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onCategoryFilter(value);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    onSort(value);
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "5px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div style={{ flex: "1", minWidth: "200px" }}>
          <label htmlFor="search">Search: </label>
          <input
            type="text"
            id="search"
            placeholder="Search by name or URL..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: "100%", padding: "5px" }}
          />
        </div>

        <div>
          <label htmlFor="category">Category: </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            style={{ padding: "5px" }}
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sort">Sort by: </label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            style={{ padding: "5px" }}
          >
            <option value="name">Name (A-Z)</option>
            <option value="nameDesc">Name (Z-A)</option>
            <option value="date">Date (Newest)</option>
            <option value="dateDesc">Date (Oldest)</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
