var express = require('express');
var router = express.Router();

var userControllers = require('../controllers/userControllers')
var auth = require('../middlewares/auth')

// Show All Users. 
router.get('/', userControllers.showAllUsers);

//  Create new User
router.post('/newUser', userControllers.createUser)

//  Login User
router.post('/login', userControllers.login)

//  Show user Profile
router.get('/profile', auth, userControllers.profile)

//  Logout from this dispositive
router.delete('/logout', auth, userControllers.logout)

//  Logout from all dispositives
router.delete('/logoutAll', auth, userControllers.logoutAll)


///////////////////////////////////////////////////////////////

// Buy new Skin
router.put('/buySkin', auth, userControllers.buySkin)

module.exports = router;
