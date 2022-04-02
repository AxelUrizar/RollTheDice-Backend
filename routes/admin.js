var express = require('express');
var router = express.Router();

var adminControllers = require('../controllers/adminControllers');
const admin = require('../middlewares/admin');
var auth = require('../middlewares/auth')

// Edit User Alias
router.put('/edit', admin, auth, adminControllers.editProfile)

module.exports = router