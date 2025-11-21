import LinkCard from "./LinkCard";

function CardView({ links, onEdit, onDelete }) {
  if (!links || links.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
        No links found. Add some links to get started!
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "flex-start",
      }}
    >
      {links.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default CardView;
