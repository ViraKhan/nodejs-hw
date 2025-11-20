import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';


// Кастомний валідатор для перевірки MongoDB ObjectId
const objectIdValidator = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message('Invalid ObjectId');
  }
  return value;
 };

// Схема для GET /notes (валідація query-параметрів)
 export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid('Work', 'Personal', 'Meeting', 'Shopping', 'Ideas', 'Travel', 'Finance', 'Health', 'Important', 'Todo'),
    search: Joi.string().allow('').optional(), // Дозволяємо порожній рядок
  }),
};

// Схема для GET /notes/:noteId та DELETE /notes/:noteId
export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().required().custom(objectIdValidator),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().allow('').optional(),
  tag: Joi.string().valid('Work', 'Personal', 'Meeting', 'Shopping', 'Ideas', 'Travel', 'Finance', 'Health', 'Important', 'Todo').optional(),
}),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).optional(),
    content: Joi.string().allow("").optional(),
    tag: Joi.string().valid('Work', 'Personal', 'Meeting', 'Shopping', 'Ideas', 'Travel', 'Finance', 'Health', 'Important', 'Todo').optional(),
  }).or("title", "content", "tag"), // Принаймні одне поле повинно бути присутнє
};
