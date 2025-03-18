import express from "express";
import { getAllUsersController, loginController, registerController, testMiddleware } from "../controllers/authControler.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router=express.Router();

router.post("/register",registerController)
router.post("/login",loginController)
router.get("/all-users",getAllUsersController)
router.get("/test",requireSignIn, isAdmin, testMiddleware)

export default router;