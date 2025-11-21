import Table from "./Table";
import CardView from "./CardView";
import Form from "./Form";
import SearchBar from "./SearchBar";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function LinkContainer() {
  const [favLinks, setFavLinks] = useState([]);
  const [editingLink, setEditingLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("table"); // "table" or "card"
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const categories = [
    "General",
    "Work",
    "Personal",
    "Learning",
    "Shopping",
    "Entertainment",
  ];

  // Fetch all links from API
  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/links`);
      setFavLinks(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching links:", err);
      setError("Failed to load links. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/links/${id}`);
      setFavLinks(favLinks.filter((link) => link.id !== id));
      setError(null);
    } catch (err) {
      console.error("Error deleting link:", err);
      setError("Failed to delete link");
    }
  };

  const handleSubmit = async (name, url, id = null, category = "General") => {
    try {
      if (id) {
        // Update existing link
        const response = await axios.put(`${API_URL}/api/links/${id}`, {
          name,
          url,
          category,
        });
        setFavLinks(
          favLinks.map((link) => (link.id === id ? response.data : link)),
        );
        setEditingLink(null);
      } else {
        // Create new link
        const response = await axios.post(`${API_URL}/api/links`, {
          name,
          url,
          category,
        });
        setFavLinks([...favLinks, response.data]);
      }
      setError(null);
    } catch (err) {
      console.error("Error saving link:", err);
      setError(id ? "Failed to update link" : "Failed to create link");
    }
  };

  const handleEdit = (link) => {
    setEditingLink(link);
  };

  const handleCancelEdit = () => {
    setEditingLink(null);
  };

  // Filter and sort links
  const filteredAndSortedLinks = useMemo(() => {
    let filtered = [...favLinks];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (link) =>
          link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          link.url.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Category filter
    if (categoryFilter !== "All") {
      filtered = filtered.filter(
        (link) => (link.category || "General") === categoryFilter,
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "nameDesc":
          return b.name.localeCompare(a.name);
        case "date":
          return new Date(b.created_at) - new Date(a.created_at);
        case "dateDesc":
          return new Date(a.created_at) - new Date(b.created_at);
        case "category":
          return (a.category || "General").localeCompare(
            b.category || "General",
          );
        default:
          return 0;
      }
    });
    return filtered;
  }, [favLinks, searchTerm, categoryFilter, sortBy]);

  return (
    <div>
      <h1>My Favorite Links</h1>
      <p>Add, edit, or delete your favorite links!</p>

      {error && <div style={{ color: "red", margin: "10px 0" }}>{error}</div>}

      {/* View Mode Toggle */}
      <div style={{ marginBottom: "15px" }}>
        <button
          onClick={() => setViewMode("table")}
          style={{
            padding: "8px 15px",
            marginRight: "5px",
            backgroundColor: viewMode === "table" ? "#4A90E2" : "#ddd",
            color: viewMode === "table" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Table View
        </button>
        <button
          onClick={() => setViewMode("card")}
          style={{
            padding: "8px 15px",
            backgroundColor: viewMode === "card" ? "#4A90E2" : "#ddd",
            color: viewMode === "card" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Card View
        </button>
      </div>

      {/* Search and Filter Bar */}
      <SearchBar
        onSearch={setSearchTerm}
        onCategoryFilter={setCategoryFilter}
        onSort={setSortBy}
        categories={categories}
      />

      {loading ? (
        <p>Loading links...</p>
      ) : (
        <>
          {viewMode === "table" ? (
            <Table
              data={filteredAndSortedLinks}
              removeLink={handleRemove}
              editLink={handleEdit}
            />
          ) : (
            <CardView
              links={filteredAndSortedLinks}
              onEdit={handleEdit}
              onDelete={handleRemove}
            />
          )}
        </>
      )}

      <h1>{editingLink ? "Edit Link" : "Add New Link"}</h1>
      <Form
        submitNewLink={handleSubmit}
        editingLink={editingLink}
        cancelEdit={handleCancelEdit}
      />
    </div>
  );
}

export default LinkContainer;
