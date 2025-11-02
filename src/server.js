import express from "express";
import 'dotenv/config';
import cors from 'cors';
import pino from 'pino-http';


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для парсингу JSON
app.use(express.json());
app.use(cors()); // Дозволяє запити з будь-яких джерел
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

/*// Головний маршрут
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Notes API</h1><p>Visit <a href="/notes">/notes</a></p>');
});*/

// Перший маршрут
app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});
// GET-запит до маршруту "/notes/:noteId"
app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({
    status: `Retrieved note with ID: ${noteId}`,
  });
});
// test-error маршрут для тестування помилки
app.get('/test-error', (req, res) => {
  throw new Error('Simulated server error');
});

// Middleware 404 (після всіх маршрутів)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Middleware для обробки помилок (останнє)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
const isProd = process.env.NODE_ENV === "production";

  res.status(500).json({
    message: isProd
    ? 'Internal Server Error'
    : err.message,
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
