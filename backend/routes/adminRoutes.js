const express = require('express');
const router = express.Router();
const {
    authAdmin,
    getAdmins
} = require('../controllers/adminController');

router.post('/login' , authAdmin)

router.get('/' , getAdmins)

module.exports =  router;