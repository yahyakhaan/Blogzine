const User = require("../modals/User");

const createUser = async (req, res, next) => {
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();
        res.status(200).json("User is Created");
    } catch (err) {
        next(err)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json("User is Updated");
    } catch (err) {
        next(err);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("The User has been deleted!");
    } catch (err) {
        next(err);
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        const { password, isAdmin, ...otherDetails } = user._doc;
        res.status(200)
            .json({ ...otherDetails })
        // res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        const updatedUsers = [];
        users.forEach(user => {
            const { password, isAdmin, ...otherDetails } = user._doc
            updatedUsers.push({...otherDetails})
        });
        res.status(200)
            .json(updatedUsers)
    } catch (err) {
        next(err);
    }
}

module.exports = { createUser, updateUser, deleteUser, getUser, getUsers }