const express = require('express');
const { handlerAddUser, handlerGetAllUser, handlerResetPassword, handlerLogin } = require('../app/user/handler');
const checkAdmin = require('../middleware/authAdmin');
const authToken = require('../middleware/authToken');

const router = express.Router();

router.get('/', authToken, checkAdmin ,handlerGetAllUser);
router.post('/login', handlerLogin);
router.post('/add', authToken, checkAdmin, handlerAddUser);
router.post('reset/:uuid', authToken, checkAdmin, handlerResetPassword);

module.exports = router;
