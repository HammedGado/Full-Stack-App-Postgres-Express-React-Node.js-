const express = require("express");
const cors = require("cors");
const db = require("./queries");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (request, response) => {
  response.json({ info: "Full Stack App - Express API for Links" });
});

// CRUD routes for links
app.get("/api/links", db.getLinks);
app.get("/api/links/:id", db.getLinkById);
app.post("/api/links", db.createLink);
app.put("/api/links/:id", db.updateLink);
app.delete("/api/links/:id", db.deleteLink);

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
