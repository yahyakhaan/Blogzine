const express = require('express');
const { register, login, logout } = require('../controllers/auth');
const User = require('../modals/User');

const router = express.Router();

//Create
router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)

// export default router;
module.exports = router;