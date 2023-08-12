const express = require('express');
const { handlerAddUser, handlerGetAllUser, handlerResetPassword } = require('../app/user/handler');
const checkAdmin = require('../middleware/authAdmin');

const router = express.Router();


router.get('/users/all', checkAdmin ,handlerGetAllUser);

router.post('/users/add', checkAdmin, handlerAddUser);
router.post('/users/reset/:uuid', checkAdmin, handlerResetPassword);

module.exports = router;