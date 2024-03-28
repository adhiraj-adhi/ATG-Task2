import express from 'express';
const router = express.Router();
import { addCommentOnPost, createAPost, deleteThePost, getAllPosts, getUsersData, likeThePost, updateThePost } from '../controllers/postsController.js';
import multer from 'multer';
import path from 'path';


/** SETTING UP MULTER MIDDLEWARE */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/postsImages');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + Math.round(Math.random() * 1000) + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage, fileFilter });


router.get("/", getAllPosts);
router.get("/userData", getUsersData);
router.post("/create", upload.single('image'), createAPost);
router.patch("/update", upload.single('image'), updateThePost);
router.delete("/delete", deleteThePost);
router.post("/like", likeThePost);
router.post("/comment", addCommentOnPost);

export default router;