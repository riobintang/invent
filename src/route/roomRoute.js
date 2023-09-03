
const { getAllRoomByWorkUnitHandler, addRoomHandler, editRoomHandler } = require('../app/room/handler');
const authToken = require('../middleware/authToken');


const router = require('express').Router();

router.get('/', authToken, getAllRoomByWorkUnitHandler);
router.post('/', authToken, addRoomHandler);
router.put('/:code_room', authToken, editRoomHandler);

module.exports = router;