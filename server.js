const express = require("express");
const path = require("path-posix");
const app = express();
const uui = require("uuid");

const fs = require("fs");
const database = require("./db/db.json");
// var { __dirname } = require("path/posix");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  res.json(database);
});

app.get("/api/noted/:id", (req, res) => {
  const foundNote = database.some(
    (nota) => nota.id === parseInt(req.params.id)
  );
  if (foundNote) {
    res.json(database.filter((nota) => nota.id === parseInt(req.perams.id)));
  } else {
    res.status(400);
  }
});

app.post("/api/notes", function (req, res) {
  let newNote = {
    id: uui.v1(),
    title: req.body.title,
    text: req.body.text,
  };
  if (!newNote) {
    res.status(400);
  }
  database.push(newNote);
  res.json(database);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

var PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log(`app is listening on port: ${PORT}`);
});
