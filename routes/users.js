var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var auth = require('../middlewares/auth')
var User = require('../models/Users');
var Token = require('../models/Tokens');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({})

    if(users.length === 0) return res.status(200).json('No hay usuarios registrados.')

    return res.status(200).json(users)
  } catch (error) {
    return res.json(error)
  }
});

router.post('/newUser', async (req, res) => {
  try {
    const {name, alias, email, password} = req.body;

    if (alias.length < 3) return res.status(401).json('El alias debe tener almenos 3 carácteres')
    if (password.length < 6) return res.status(401).json('La contraseña debe tener almenos 6 carácteres');

    const userExists = await User.find({alias: alias, email: email});

    if (userExists.length !== 0) return res.status(401).json('Introduce datos válidos');

    const encryptPassword = await bcrypt.hash(password, 8);
    const user = await User.create({
      name: name,
      alias: alias,
      email: email,
      password: encryptPassword
    })

    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json('Ha ocurrido algo')    
  }
})

router.post('/login', async (req, res) => {
  try {
    const {alias, password} = req.body
    
    const user = await User.findOne({alias: alias})
    
    const decriptedPassword = await bcrypt.compare(password, user.password)
    if(!user || !decriptedPassword) return res.status(401).json('Credenciales no válidos')

    const generateToken = jwt.sign({id: user._id, roles: user.roles}, process.env.JWT_SECRET)
    await Token.create({token: generateToken, userId: user._id})

    res.status(200).json({user, token: generateToken})
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get('/profile', auth, async(req, res) => {
  try {
    const user = await User.findById(req.user._id)
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.delete('/logout', auth, async (req, res) => {
  try {
    const token = await Token.deleteOne({token: req.token})
    return token.deletedCount === 1 ? res.status(200).json('Logout Completado') : res.status(401).json('Algo ha salido mal')
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.delete('/logoutAll', auth, async (req, res) => {
  try {
    await Token.deleteMany({userId: req.user._id})
    return res.status(200).json('Logout de todos los dispositivos completado')
  } catch (error) {
    return res.status(500).json(error)
  }
})

module.exports = router;
