import { useState, useEffect } from "react";

function Form(props) {
  const [name, setName] = useState("");
  const [url, setURL] = useState("");
  const [category, setCategory] = useState("General");

  const categories = [
    "General",
    "Work",
    "Personal",
    "Learning",
    "Shopping",
    "Entertainment",
  ];

  // Update form when editingLink changes
  useEffect(() => {
    if (props.editingLink) {
      setName(props.editingLink.name || "");
      setURL(props.editingLink.url || "");
      setCategory(props.editingLink.category || "General");
    } else {
      setName("");
      setURL("");
      setCategory("General");
    }
  }, [props.editingLink]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleURLChange = (event) => {
    setURL(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim() && url.trim()) {
      if (props.editingLink) {
        props.submitNewLink(name, url, props.editingLink.id, category);
      } else {
        props.submitNewLink(name, url, null, category);
      }
      if (!props.editingLink) {
        setName("");
        setURL("");
        setCategory("General");
      }
    }
  };
  const handleCancel = () => {
    setName("");
    setURL("");
    setCategory("General");
    if (props.cancelEdit) {
      props.cancelEdit();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="linkName">Link Name:</label>
      <input
        type="text"
        id="linkName"
        name="linkName"
        value={name}
        onChange={handleNameChange}
        required
      />
      <br />
      <br />
      <label htmlFor="linkURL">Link URL:</label>
      <input
        type="url"
        id="linkURL"
        name="linkURL"
        value={url}
        onChange={handleURLChange}
        required
      />
      <br />
      <br />
      <label htmlFor="linkCategory">Category:</label>
      <select
        id="linkCategory"
        value={category}
        onChange={handleCategoryChange}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <br />
      <br />
      <input type="submit" value={props.editingLink ? "Update" : "Submit"} />
      {props.editingLink && (
        <>
          <button
            type="button"
            onClick={handleCancel}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </>
      )}
    </form>
  );
}

export default Form;
