import express from "express";


import { getProductsController, saveProductController} from "../Controller/Product.js";
import { createUser, loginUser } from "../controller/user.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", createUser);
router.post("/addproducts", saveProductController);
router.get("/products", getProductsController);

export default router;