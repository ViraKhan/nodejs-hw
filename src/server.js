import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';
import { errorHandler } from './middleware/errorHandlers.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';


const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors()); // Дозволяє запити з будь-яких джерел
app.use(helmet()); // Додає безпекові заголовки
app.use(express.json()); // Middleware для парсингу JSON


app.use(notesRoutes); // Routes for notes

app.use(notFoundHandler); // 404 handler
app.use(errorHandler); // General error handler

await connectMongoDB(); // підключення до MongoDB


// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
