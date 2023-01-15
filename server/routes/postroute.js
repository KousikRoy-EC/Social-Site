import  express  from "express";
import {createPost, deletePost, getPost, updatePost , timelinePost, likePost} from "../controllers/postController.js";

const router = express.Router();

router.post("/",createPost);
router.get("/:id",getPost);
router.put("/:id",updatePost);
router.delete("/:id",deletePost);
router.get("/:id/feedpost",timelinePost);
router.put('/:id/like',likePost)
export default router;