import { HttpError } from "http-errors";

export const errorHandler = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      error: isProd
        ? "Internal Server Error"
        : err.message || err.name,
    });
  }

  res.status(500).json({
    error: isProd ? "Internal Server Error" : err.message,
  });
};
