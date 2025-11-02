import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// enable JSON parsing
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Express learner! 🚀");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
