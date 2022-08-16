const express = require('express');
const controller = require('../controllers/projectCodeController');
const router = express.Router();
// const authMiddleware = require('../middleware/authMiddleware');
router.get('/getNecessaryInfo', controller.getNecessaryInfo);
router.post('/addNewProjectCode', controller.addNewProjectCode);

module.exports = router;