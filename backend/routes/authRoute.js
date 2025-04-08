import express from "express";
import { getAllUsersController, loginController, registerController, updateUserProfileControler } from "../controllers/authControler.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router=express.Router();

router.post("/register",registerController)
router.post("/login",loginController)
router.get("/all-users",getAllUsersController)
router.put("/update-profile", requireSignIn, updateUserProfileControler)

export default router; 