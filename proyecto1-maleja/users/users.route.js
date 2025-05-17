const express = require('express');
const router = express.Router();
const { getUser, updateUser, deleteUser } = require('./users.controller');
const verifyToken  = require('../auth/auth.jwt');
const permissions = require('../middleware/permissions.middleware');


router.get('/:id?', verifyToken, getUser);
router.put('/:id?', verifyToken, permissions.canEditUser, updateUser);
router.delete('/:id', verifyToken, permissions.canDeleteUser, deleteUser);

module.exports = router;