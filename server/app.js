import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import leadRoutes from "./routes/leadRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  ...(process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : []),
  ...(process.env.CLIENT_URLS ? process.env.CLIENT_URLS.split(",") : [])
].map((origin) => origin.trim().replace(/\/$/, ""));

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/$/, "");
      const isAllowed =
        allowedOrigins.includes(normalizedOrigin) ||
        normalizedOrigin.endsWith(".vercel.app");

      if (isAllowed) return callback(null, true);

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "LeadFlow CRM API is running"
  });
});

app.use("/api/leads", leadRoutes);
app.use(errorHandler);

export default app;
