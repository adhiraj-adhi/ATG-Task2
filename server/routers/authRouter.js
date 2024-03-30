import express from 'express';
import { changePassword, createUser, forgotPassword, userLogin } from '../controllers/authController.js';
const router = express.Router();
import multer from 'multer';
import path from 'path';


/** SETTING UP MULTER MIDDLEWARE */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/profilePictures');
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


router.post("/create", upload.single('profilePic'), createUser);
router.post("/login", userLogin);
router.post("/forgotPassword", forgotPassword);
router.post("/recoverPassword", changePassword);

export default router;