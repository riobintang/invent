const express = require('express');
const { handlerAddUser, handlerResetPassword, handlerLogin, handlerChangePassword, handlerGetAllUserWithoutAdmin } = require('../app/user/handler');
const checkAdmin = require('../middleware/authAdmin');
const authToken = require('../middleware/authToken');

const router = express.Router();

router.get('/', authToken, checkAdmin, handlerGetAllUserWithoutAdmin);
router.post('/login', handlerLogin);
router.post('/add', authToken, checkAdmin, handlerAddUser);
router.post('/changepassword', authToken, handlerChangePassword);
router.post('reset/:uuid', authToken, checkAdmin, handlerResetPassword);

module.exports = router;
