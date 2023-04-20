const express = require("express");
const { getUsers, createUser, getOneUser} = require("../controllers/users.controller.js");

const router = express.Router();

router.get('/login', getUsers);
router.get('/login/user/:userName', getOneUser);
router.post('/login/create', createUser);

export default router;