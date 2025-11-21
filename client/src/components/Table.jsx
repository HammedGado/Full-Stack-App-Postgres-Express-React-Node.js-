function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>URL</th>
        <th>Category</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
}

const TableBody = (props) => {
  if (!props.linkData || props.linkData.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan="4">No links added yet</td>
        </tr>
      </tbody>
    );
  }
  const getCategoryColor = (category) => {
    const colors = {
      Work: "#4A90E2",
      Personal: "#50C878",
      Learning: "#FF6B6B",
      Shopping: "#FFA500",
      Entertainment: "#9B59B6",
      General: "#95A5A6",
    };
    return colors[category] || colors["General"];
  };

  const rows = props.linkData.map((row) => {
    return (
      <tr key={row.id}>
        <td>{row.name}</td>
        <td>
          <a href={row.url} target="_blank" rel="noopener noreferrer">
            {row.url}
          </a>
        </td>
        <td>
          <span
            style={{
              backgroundColor: getCategoryColor(row.category || "General"),
              color: "white",
              padding: "3px 8px",
              borderRadius: "12px",
              fontSize: "0.75em",
              fontWeight: "bold",
            }}
          >
            {row.category || "General"}
          </span>
        </td>
        <td>
          <button
            onClick={() => props.editLink(row)}
            style={{ marginRight: "5px" }}
          >
            Edit
          </button>
          <button onClick={() => props.removeLink(row.id)}>Delete</button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody
        linkData={props.data}
        removeLink={props.removeLink}
        editLink={props.editLink}
      />
    </table>
  );
}

export default Table;
