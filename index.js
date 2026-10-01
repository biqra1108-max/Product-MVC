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

// CORS ko yeh configuration dein taaki har origin allow ho jaye aur credentials bhi chal sakeinconst express = require('express');


// Permanent CORS configuration
// // ya simple cors package
app.use(cors({
  origin: [
    'https://statuesque-pasca-1a892c.netlify.app', // Yeh aapka naya Netlify URL hai
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true
}));

app.use(cors({
  origin: function (origin, callback) {
    // Agar request server-to-server ya Postman se ho (jiska origin nahi hota)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy violation: This origin is not allowed.'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Zaroori hai taake preflight OPTIONS requests fail na hon
app.options('*', cors());

app.use(express.json());
app.use("/api", UserRoutes);

const PORT = 5050; // Ya jo port aap use kar rahe hain
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});