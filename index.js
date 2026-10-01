import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utlis/DB.js";
import UserRoutes from "./routes/user.js";
import dns from "node:dns/promises";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();
connectDB();

const app = express();

// CORS Configuration
app.use(cors({
  origin: [
    'https://statuesque-pasca-1a892c.netlify.app', // Aapka Netlify URL
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Zaroori hai taake preflight OPTIONS requests fail na hon ( yahan * ki jagah /* kar diya hai )
app.options('/*', cors());

app.use(express.json());
app.use("/api", UserRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});