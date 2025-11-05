import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);
  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }
  res.status(200).json(note);
};

// POST-запит до маршруту "/notes"
 export const postAllNotes = async (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
};


// PATCH-запит до маршруту "/notes/:noteId"
 export const patchNotesById = async (req, res) => {
  res.status(200).json({});
};


// DELETE-запит до маршруту "/notes/:noteId"
 export const deleteNoteById = async (req, res) => {
  res.status(200).json({});
};
