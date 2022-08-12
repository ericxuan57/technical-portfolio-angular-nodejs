const express = require('express');
const controller = require('../controllers/authController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/sign-up', controller.signUp);
router.post('/sign-in', controller.signIn);
router.post('/refresh-access-token', authMiddleware, controller.getCheckAuthentication);

module.exports = router;