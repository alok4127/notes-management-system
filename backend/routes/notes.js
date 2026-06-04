const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// GET all notes
router.get("/", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// ADD note
router.post("/", async (req, res) => {
  const note = await Note.create({
    text: req.body.text,
  });

  res.json(note);
});

// UPDATE note
router.put("/:id", async (req, res) => {
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text },
    { new: true }
  );

  res.json(note);
});

// DELETE note
router.delete("/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);

  res.json({ message: "Note deleted" });
});

module.exports = router;