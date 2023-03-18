const express = require("express");
const multer = require("multer");
const path = require("path");
const userController = require("../controller/userController");
const auth = require('../middleware/auth')

const router = express.Router();

router.use(express.static("public"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/uploads"), function (err, success) {
            if (err) throw err;
        })
    },
    filename: function (req, file, cb) {
        const name = Date.now() + "_" + path.extname(file.originalname);
        cb(null, name, function (error, success) {
            if (error) throw error;
        })
    }
})

const upload = multer({storage: storage})

// user login
router.post('/register', upload.single("image"), userController.userRegister)

// user register
router.post('/login', userController.userLogin)

// user update password
router.post('/updatepassword', auth, userController.userUpdatePassword)

// auth test
router.get('/test', auth, userController.test)

module.exports = router