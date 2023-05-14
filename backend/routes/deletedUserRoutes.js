const deletedusers = require('../models/deletedUsersModel');

const express = require('express');

const {
    addDeletedUser,
    getDeletedUsers,
    getDeletedUser
} = require('../controllers/deletedUsersController');
const router = require('./userRoutes');


router.post('/' , addDeletedUser)

router.get('/:id' , getDeletedUser)

router.get('/' , getDeletedUsers)

module.exports = router