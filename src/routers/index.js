const asyncHandler = require('express-async-handler');
const { detail, list } = require('../controllers/positionController');
const router = require('express').Router();
const { login } = require('../controllers/userController');
const { authenticateToken } = require('../services/user');

router.get('/', asyncHandler(async (req, res, next) => {
    res.status(200).json({
        message: 'Server is live !',
        time: new Date()
    });
    return next();
}));

router.post('/', asyncHandler(async (req, res, next) => {
    res.status(200).json({
        message: 'Ok !',
    });
    return next();
}));

router.post('/auth/login', login);
router.get('/api/recruitment/positions.json', authenticateToken, list);
router.get('/api/recruitment/positions/:id', authenticateToken, detail);

module.exports = { router };
