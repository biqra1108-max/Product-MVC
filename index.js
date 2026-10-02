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
  origin: true,
  credentials: true

}));



app.use(express.json());
app.use("/api", UserRoutes);
app.use((req,res,next)=>{
  res.status(404).send("Not Found");
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});