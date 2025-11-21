require("dotenv").config();

const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

const getLinks = (request, response) => {
  pool.query("SELECT * FROM links ORDER BY id ASC", (error, results) => {
    if (error) {
      console.error("Error fetching links:", error);
      return response.status(500).json({ error: "Failed to fetch links" });
    }
    response.status(200).json(results.rows);
  });
};

const getLinkById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM links WHERE id = $1", [id], (error, results) => {
    if (error) {
      console.error("Error fetching link:", error);
      return response.status(500).json({ error: "Failed to fetch link" });
    }
    if (results.rows.length === 0) {
      return response.status(404).json({ error: "Link not found" });
    }
    response.status(200).json(results.rows[0]);
  });
};

const createLink = (request, response) => {
  const { name, url, category } = request.body;

  if (!name || !url) {
    return response.status(400).json({ error: "Name and URL are required" });
  }

  pool.query(
    "INSERT INTO links (name, url, category) VALUES ($1, $2, $3) RETURNING *",
    [name, url, category || "General"],
    (error, results) => {
      if (error) {
        console.error("Error creating link:", error);
        return response.status(500).json({ error: "Failed to create link" });
      }
      response.status(201).json(results.rows[0]);
    },
  );
};

const updateLink = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, url, category } = request.body;

  if (!name || !url) {
    return response.status(400).json({ error: "Name and URL are required" });
  }

  pool.query(
    "UPDATE links SET name = $1, url = $2, category = $3 WHERE id = $4 RETURNING *",
    [name, url, category || "General", id],
    (error, results) => {
      if (error) {
        console.error("Error updating link:", error);
        return response.status(500).json({ error: "Failed to update link" });
      }
      if (results.rows.length === 0) {
        return response.status(404).json({ error: "Link not found" });
      }
      response.status(200).json(results.rows[0]);
    }
  );
};

const deleteLink = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "DELETE FROM links WHERE id = $1 RETURNING *",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error deleting link:", error);
        return response.status(500).json({ error: "Failed to delete link" });
      }
      if (results.rows.length === 0) {
        return response.status(404).json({ error: "Link not found" });
      }
      response
        .status(200)
        .json({
          message: `Link deleted with ID: ${id}`,
          deleted: results.rows[0],
        });
    },
  );
};

module.exports = {
  getLinks,
  getLinkById,
  createLink,
  updateLink,
  deleteLink,
};
