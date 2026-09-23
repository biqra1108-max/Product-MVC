import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./utlis/DB.js";
import UserRoutes from "./routes/user.js";
import{hashPassword, comparePassword} from "./utlis/bcrypt.js";
import dns from "node:dns/promises";
import{connectRedis} from "./utlis/redis.js";
import { setCache,getCache } from "./utlis/redis.js";

dns.setServers(["1.1.1.1","8.8.8.8"])

dotenv.config();
connectDB();
connectRedis();
const app = express();
 
app.use(cors());
app.use(express.json());
app.use("/users", UserRoutes);
setCache("name", "john Doe", 3600);
console.log(await getCache("name"));

app.listen(5050,()=>{
    console.log("Server is runing on port 5050");
});
/*const payload = {
    userId: "12345",
    type: "admin",
};
const token = signJWT(payload);
console.log("Generated JWT:", token);

const decoded = verifyJWT(token);
console.log("Decoded JWT:", decoded);*/

const plainPassword = "123456789";

const hashedPassword = await hashPassword(plainPassword);
console.log("Hashed Password:", hashedPassword);
console.log("plainPassword:",plainPassword);

console.log(await comparePassword(plainPassword, hashedPassword));