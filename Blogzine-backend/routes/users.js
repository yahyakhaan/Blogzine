const express = require('express');
const { createUser, updateUser, deleteUser, getUser, getUsers } = require('../controllers/user');
const { DestroyAuth, isAuth } = require('../utils/token');
const { verifyToken, verifyUser } = require('../utils/verify');

const router = express.Router();

//AUTH CHECK VERIFICATION
// router.get("/check/authentication", isAuth);
// router.get("/check/authentication", verifyToken, (req, res, next) => {
//     res.send("Hello, the user is logged in!")
// });

// router.get("/check/:id", verifyUser, (req, res, next) => {
//     res.send("Hello user, you are logged in and you can delete your account!")
// });

// router.get("/check/admin/:id", verifyUser, (req, res, next) => {
//     res.send("Hello admin, you are logged in and you can delete all account!")
// });

//AUTH DESTRUCTION
// router.get("/destroy/authentication", DestroyAuth);


//CREATE
router.post('/', verifyUser, createUser)

//UPDATE
router.put('/:id', verifyUser, updateUser)

//DELETE
router.delete('/:id', verifyUser, deleteUser)

//GET
router.get('/:id', verifyUser, getUser)

//GET ALL
router.get('/', verifyUser, getUsers)

module.exports = router;