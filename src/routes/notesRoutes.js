import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote
} from '../controllers/notesController.js';
import { celebrate } from 'celebrate';
import { createNoteSchema, getNoteByIdSchema } from '../validations/notesValidations.js';


const router = Router();


router.get('/notes', getAllNotes);
router.get('/notes/:noteId', getNoteById);
router.post('/notes', celebrate(createNoteSchema),
createNote);
router.delete('/notes/:noteId', celebrate(getNoteByIdSchema), deleteNote);
router.patch('/notes/:noteId', updateNote);

export default router;
