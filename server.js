var express = require("express");
var path = require("path-posix");
var app = express();
const uui = require("uuid");
var bodyParser = require("body-parser");
const fs = require("fs");
let database = require("./db/db.json");
const { json } = require("body-parser");
// const { resolve } = require("path/posix");
// const { rejects } = require("assert");
path.resolve(__dirname, "/db/db.json");
const router = require("express").Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  res.json(database);
});

// app.get("/api/notes/:id", (req, res) => {
//   const foundNote = database.some((note) => note.id === parseInt(req.params.id));
//   if (foundNote) {
//     res.json(database.filter((note) => note.id !== parseInt(req.perams.id)));
//   } else {
//     res.json({
//       message: "sorry wilmer somthig went wrong",
//     });
//   }
// });

app.post("/api/notes", function (req, res) {
  // function guardaNota(nota) {
  //   return new Promise((resolve, rejects) => {
  //     json.push({ nota });

  let newNote = {
    id: uui.v1(),
    title: req.body.title,
    text: req.body.text,
  };

  if (!newNote) {
    res.status(400);
  } else {
    database.push(newNote);

    res.json(database);
  }
});

app.delete("/api/notes/:id", (req, res) => {
  let identicatdo = req.params.id;
  let found = database.findIndex((a) => a.id === identicatdo);
  if (found > -1) {
    database.splice(found, 1), res.json(database);
  } else {
    res.json({
      message: "sorry wilmer somthig went wrong",
    });
  }
});

// app.delete("/api/noted/:id", (req, res) => {
//   const foundNote = database.some((noty) => noty.id === parseInt(req.params.id));

//   if (foundNote) {

//  var esto= database.filter(function(note){ note.id === parseInt(req.perams.id)} )

//     res.json(esto);
//   } else {
//     res.json({
//       message: "sorry wilmer somthig went wrong",
//     });
//   }
// });

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

var PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log(`app is listening on port: ${PORT}`);
});

function removeNote(id) {
  // Get all notes, remove the note with the given id, write the filtered notes
  return this.getNotes()
    .then((notes) => notes.filter((note) => note.id !== id))
    .then((filteredNotes) => this.write(filteredNotes));
}
