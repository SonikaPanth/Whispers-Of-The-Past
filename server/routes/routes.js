const express=require('express');
const router=express.Router();
const API =require("../controllers/api")
const multer=require('multer');

//multer middleware

// Multer Storage Configuration
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");  // Ensure "uploads" folder exists
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);  // ✅ Fixed
    }
});

// Multer Middleware
let upload = multer({
    storage: storage,
}).single("image"); // ✅ Ensure the field name "image" matches in the frontend


//All the routes

router.get("/",(API.fetchAllPost));
router.get("/:id",(API.fetchlPostById));
router.post("/",upload,(API.createPost));
router.patch("/:id", upload, (req, res, next) => {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);
    next();
}, API.updatePost);

router.delete("/:id",upload,(API.deletePost));


module.exports=router;