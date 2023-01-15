import express from "express";
import {deleteUser, getAllUser,getUser,updateUser ,followUser,unfollowUser } from "../controllers/userController.js"

const router = express.Router();
router.get('/', getAllUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.post('/:id', deleteUser);
router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unfollowUser);
export default router;