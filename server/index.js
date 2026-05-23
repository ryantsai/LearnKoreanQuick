import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { lessonData } from "./lessonData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const app = express();
const port = process.env.PORT || 4173;

app.use(express.json());

app.get("/api/lesson", (_req, res) => {
  res.json(lessonData);
});

app.use(express.static(path.join(rootDir, "dist")));
app.use("/assets", express.static(path.join(rootDir, "public", "assets")));

app.get("/{*splat}", (_req, res) => {
  res.sendFile(path.join(rootDir, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Learn Korean Quick server running at http://127.0.0.1:${port}`);
});
