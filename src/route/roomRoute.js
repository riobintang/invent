const { getAllRoomByWorkUnit } = require('../app/room/handler');
const authToken = require('../middleware/authToken');


const router = require('express').Router();

router.get('/', authToken, getAllRoomByWorkUnit);
router.post('/', authToken, );
router.put('/:id', authToken, );

module.exports = router;