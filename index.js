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

// CORS ko yeh configuration dein taaki har origin allow ho jaye aur credentials bhi chal sakein
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());
app.use("/api", UserRoutes);

const PORT = 5050; // Ya jo port aap use kar rahe hain
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});