const express = require('express');
const { handlerLogin } = require('../app/user/handler');
const { handlerGetRoles, handlerGetRoleById } = require('../app/role/handler');
const router = express.Router();

router.post('/users/login', handlerLogin);

router.get('/roles', handlerGetRoles);
router.get('/roles/:id', handlerGetRoleById);

module.exports = router;