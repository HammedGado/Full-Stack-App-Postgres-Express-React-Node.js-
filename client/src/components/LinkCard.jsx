function LinkCard({ link, onEdit, onDelete }) {
  // Extract domain from URL for favicon
  const getDomain = (url) => {
    try {
      const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`);
      return urlObj.hostname.replace("www.", "");
    } catch {
      return "default";
    }
  };

  const domain = getDomain(link.url);
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

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
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        margin: "10px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
        backgroundColor: "#fff",
        minWidth: "250px",
        flex: "1 1 300px",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-2px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <img
          src={faviconUrl}
          alt={`${link.name} favicon`}
          style={{ width: "24px", height: "24px", marginRight: "10px" }}
          onError={(e) => {
            e.target.src =
              'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><rect width="24" height="24" fill="%23ddd"/></svg>';
          }}
        />
        <h3 style={{ margin: 0, flex: 1 }}>{link.name}</h3>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#4A90E2",
            textDecoration: "none",
            wordBreak: "break-all",
            fontSize: "0.9em",
          }}
        >
          {link.url}
        </a>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <span
          style={{
            backgroundColor: getCategoryColor(link.category || "General"),
            color: "white",
            padding: "3px 8px",
            borderRadius: "12px",
            fontSize: "0.75em",
            fontWeight: "bold",
          }}
        >
          {link.category || "General"}
        </span>

        <div>
          <button
            onClick={() => onEdit(link)}
            style={{
              marginRight: "5px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(link.id)}
            style={{
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default LinkCard;
