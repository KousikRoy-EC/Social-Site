import express from "express";
import {loginUser, registerNewUser} from "../controllers/authController.js"

const router = express.Router();

router.post('/signup',registerNewUser);
router.post('/login',loginUser);
export default router;