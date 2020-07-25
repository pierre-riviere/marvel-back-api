const router = require('express').Router();
const charactersProcess = require('./characters/characters-process');

router.use('/characters', charactersProcess);

router.use((req, res) => {
    res.status(404).send({ code: 404, errorCode: 'endpoint_not_found', message: 'Endpoint not found' });
});

module.exports = router;
