const express = require('express');
const router = express.Router();
const { saveUpdate, getUpdate } = require('../controllers/updatecontroller');

router.post('/save', saveUpdate);
router.get('/:userId/:videoId', getUpdate);

module.exports = router;