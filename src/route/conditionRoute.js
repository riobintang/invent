const router = require('express').Router();
const { handlerGetAll, handlerGetById } = require('../app/condition/handler');
const authToken = require('../middleware/authToken');

router.get('/', authToken, handlerGetAll);
router.get('/:id', authToken, handlerGetById);

module.exports = router;