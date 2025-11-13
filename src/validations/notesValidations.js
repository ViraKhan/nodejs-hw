import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
  title: Joi.string().min(3).max(100).required(),
  content: Joi.string().min(1).required(),
  tag: Joi.string().valid('Work', 'Personal', 'Meeting', 'Shopping', 'Ideas', 'Travel', 'Finance', 'Health', 'Important', 'Todo').required(),
}),
};

const objectIdValidator = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message('Invalid ObjectId');
  }
  return value;
 };


export const getNoteByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.custom(objectIdValidator).required(),
  }),
};
