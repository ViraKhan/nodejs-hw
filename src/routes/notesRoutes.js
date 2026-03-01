import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote
} from '../controllers/notesController.js';
import { celebrate } from 'celebrate';
import { createNoteSchema, getAllNotesSchema, noteIdSchema, updateNoteSchema } from '../validations/notesValidation.js';


const router = Router();


// GET /notes (з валідацією query-параметрів)
router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);
// GET /notes/:noteId (з валідацією ID)
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);
// POST /notes (з валідацією тіла)
router.post('/notes', celebrate(createNoteSchema), createNote);
// DELETE /notes/:noteId (з валідацією ID)
router.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);
// PATCH /notes/:noteId (з валідацією ID та тіла)
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default router;
