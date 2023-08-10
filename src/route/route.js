const express = require('express');
const { handlerAddUser, handlerGetAllUser, handlerResetPassword } = require('../app/user/handler');
const authToken = require('../middleware/authToken');
const checkAdmin = require('../middleware/authAdmin');

const router = express.Router();


router.get('/users/all', authToken, checkAdmin ,handlerGetAllUser);

router.post('/users/add', authToken, checkAdmin, handlerAddUser);
router.post('/users/reset/:uuid', authToken, checkAdmin, handlerResetPassword);

module.exports = router;