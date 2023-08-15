const express = require('express');
const { handlerGetAllWorkUnit, handlerGetWorkUnitById, handlerAddWorkUnit, handlerUpdateWorkUnit } = require('../app/work_unit/handler');
const authToken = require('../middleware/authToken');
const checkAdmin = require('../middleware/authAdmin');

const router = express.Router();


router.get('/', authToken, checkAdmin,handlerGetAllWorkUnit);
router.get('/:id', authToken, checkAdmin, handlerGetWorkUnitById);
router.post('/', authToken, checkAdmin, handlerAddWorkUnit);
router.put('/:id', authToken, checkAdmin, handlerUpdateWorkUnit);

module.exports = router;