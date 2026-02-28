import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { logger } from "./middleware/logger.js";
import { errors } from "celebrate";
import authRoutes from "./routes/authRoutes.js";




const app = express();
const PORT = process.env.PORT ?? 3000;


app.use(helmet()); // Додає безпекові заголовки
app.use(logger);   // Логування запитів
app.use(express.json()); // Middleware для парсингу JSON
app.use(cors()); // Дозволяє запити з будь-яких джерел
app.use(cookieParser()); // Парсинг cookie

app.use(authRoutes); // Routes for authentication
app.use(notesRoutes); // Routes for notes
app.use(userRoutes); // Routes for user operations

app.use(notFoundHandler); // 404 handler
app.use(errors()); // обробка помилок від celebrate (валідація)
app.use(errorHandler); // // глобальна обробка інших помилок

await connectMongoDB(); // підключення до MongoDB


// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
