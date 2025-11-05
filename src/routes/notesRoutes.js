import { Router } from 'express';
import { deleteNoteById, getAllNotes, getNoteById, patchNotesById, postAllNotes} from '../controllers/notesController.js';


const router = Router();


router.get('/notes', getAllNotes);
router.get('/notes/:noteId', getNoteById);
router.post('/notes', postAllNotes);
router.patch('/notes/:noteId', patchNotesById);
router.delete('/notes/:noteId', deleteNoteById);


export default router;
