import createHttpError from 'http-errors';
import { Note } from '../models/note.js';


export const getAllNotes = async (req, res) => {
const { page = 1, perPage = 10, tag, search } = req.query;
 const skip = (page - 1) * perPage;

 const notesQuery = Note.find({ userId: req.user._id }); // Фільтруємо нотатки за ідентифікатором користувача

 if (search) {
  notesQuery.where({
    $text: { $search: search }
  });
 }

 if (tag) {
  notesQuery.where("tag").equals(tag);
 }

 const [totalItems, notes] = await Promise.all([
  notesQuery.clone().countDocuments(),
  notesQuery.skip(skip).limit(perPage),
 ]);

 const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOne({
    _id: noteId,
    userId: req.user._id, // Переконуємося, що нотатка належить автентифікованому користувачу
  });
  if (!note) {
     throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
  };

// POST-запит(create) до маршруту "/notes"
 export const createNote = async (req, res) => {
  const note = await Note.create({
    ...req.body,
    userId: req.user._id, // Додаємо ідентифікатор користувача
 });
  res.status(201).json(note);
};

// DELETE-запит до маршруту "/notes/:noteId"
 export const deleteNote = async (req, res) => {
   const { noteId } = req.params;
   const note = await Note.findOneAndDelete({
     _id: noteId,
    userId: req.user._id, // Переконуємося, що нотатка належить автентифікованому користувачу
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};

// PATCH-запит (update) до маршруту "/notes/:noteId"
 export const updateNote = async (req, res) => {
  const { noteId} = req.params;
  const note = await Note.findOneAndUpdate(
    { _id: noteId, userId: req.user._id },
    req.body,
    { new: true });
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};
