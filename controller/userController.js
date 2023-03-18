const User = require("../model/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config/config")


const securePassword = async (password) => {
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        return hashPassword;
    } catch (exc) {
        return res.status(400).json(exc.message);
    }
}

const createToken = async (id) => {
    try {
        const token = await jwt.sign({ _id: id }, config.sec_key, { expiresIn: "1h" });
        return token;
    } catch (exc) {
        return res.status(400).json(exc.message);
    }
}

const userRegister = async (req, res) => {
    const { name, email, phone, password, image } = req.body;
    const hashPassword = await securePassword(password);
    try {
        const newUser = User({
            name,
            email,
            phone,
            password: hashPassword,
            image
        })
        const exUser = await User.findOne({ email: email });
        if (exUser) {
            return res.status(400).json({ success: false, msg: "Email Already Exists" });
        } else {
            const saveUser = await newUser.save()
            const tokenData = await createToken(saveUser._id);
            return res.status(200).json({ success: true, msg: "Register Successful", data: saveUser, "token": tokenData });
        }
    } catch (exc) {
        return res.status(400).json(exc.message);
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email && !password) {
            return res.status(400).json({ success: false, msg: "Rquired" });
        }
        const exUser = await User.findOne({ email: email })
        if (exUser && (bcrypt.compareSync(password, exUser.password))) {
            const tokenData = await createToken(exUser._id);
            return res.status(200).json({ success: true, msg: "Login Successful", "user": exUser, "token": tokenData });

        }else{
            return res.status(404).json({ success: false, msg: "Invalid Credentials"});
        }
    } catch (exc) {
        return res.status(400).json(exc.message);
    }
}

const userUpdatePassword = async (req, res) => {
    const { user_id, password } = req.body
    try {
        const data = await User.findOne({ _id: user_id })
        if (data) {
            if (password) {
                const newPassword = await securePassword(password)
                await User.findByIdAndUpdate({ _id: user_id }, {
                    $set: {
                        password: newPassword
                    }
                })
                return res.status(201).json({ success: true, message: "password updated successfully" })
            } else {
                return res.status(400).json({ success: false, message: "PassWord is required!" })
            }
        } else {
            return res.status(400).json({ success: false, message: "user not found!" })
        }
    } catch (exc) {
        return res.status(400).json(exc.message);
    }
}

const test = (req, res)=>{
    res.status(200).json({success: true, message: "You can access this page"})
}

module.exports = {
    userRegister,
    securePassword,
    createToken,
    userLogin,
    userUpdatePassword,
    test
}