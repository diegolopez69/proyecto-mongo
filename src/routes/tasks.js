const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('API TASK is goes here')
});

module.exports = router;