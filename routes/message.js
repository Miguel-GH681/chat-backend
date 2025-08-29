const { Router } = require('express');
const { getMessages } = require('../controller/message');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:id', validarJWT, getMessages);

module.exports = router;