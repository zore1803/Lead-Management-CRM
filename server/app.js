import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import leadRoutes from "./routes/leadRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
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
