const bcrypt = require("bcryptjs");
const User = require("../modals/User");
const createError = require("../utils/error")
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            name: req.body.username,
            email: req.body.email,
            password: hash
        })

        await newUser.save();
        res.status(200).json("User has been Created")
    } catch (err) {
        next(err);
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return next(createError(404, "User not Found!"));
        const isPassword = await bcrypt.compare(req.body.password, user.password)
        if (!isPassword) return next(createError(400, "Wrong password or username"));

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET);

        const { password, isAdmin, ...otherDetails } = user._doc;

        // req.session.isAuth = true;
        // req.session.user = { ...otherDetails }

        // res.cookie("access_token", token, {
        //     httpOnly: true,
        // })
        object = {
            token: token,
            user: { ...otherDetails }
        }
        res.status(200)
            .json(object)
    } catch (err) {
        next(err);
    }
}

const logout = (req, res, next) => {
    const refreshToken = req.body.token;
    return res.send('The User is currently logged out!')

}

module.exports = { register, login, logout }