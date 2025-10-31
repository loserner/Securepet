import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

// Simulated encryption: ENC:<base64>
function simulateEncrypt(plaintext: string): string {
  const base64 = Buffer.from(plaintext, "utf-8").toString("base64");
  return `ENC:${base64}`;
}

function simulateDecrypt(ciphertext: string): string {
  if (!ciphertext.startsWith("ENC:")) return ciphertext;
  const base64 = ciphertext.slice(4);
  try {
    return Buffer.from(base64, "base64").toString("utf-8");
  } catch {
    return ciphertext;
  }
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/encrypt", (req, res) => {
  const { data } = req.body as { data?: string };
  if (typeof data !== "string") {
    return res.status(400).json({ error: "data must be string" });
  }
  const encrypted = simulateEncrypt(data);
  res.json({ encrypted });
});

app.post("/api/decrypt", (req, res) => {
  const { data } = req.body as { data?: string };
  if (typeof data !== "string") {
    return res.status(400).json({ error: "data must be string" });
  }
  const decrypted = simulateDecrypt(data);
  res.json({ decrypted });
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});


