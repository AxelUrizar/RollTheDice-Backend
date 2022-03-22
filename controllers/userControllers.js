var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var User = require('../models/Users');
var Token = require('../models/Tokens');
var Skins = require('../models/Skins');

// 
//  Show all Users
// 
exports.showAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({})

        if(users.length === 0) return res.status(200).json('No hay usuarios registrados.')

        return res.status(200).json(users)
    } catch (error) {
        return res.json(error)
    }
}

// 
//  Create new User
// 
exports.createUser = async (req, res) => {
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
}

// 
//  Login User
// 
exports.login = async (req, res) => {
    try {
      const {alias, password} = req.body
      
      const user = await User.findOne({alias: alias}).populate('skins', {
        name: 1,
        imageURL: 1,
        _id: 0
      })
      
      const decriptedPassword = await bcrypt.compare(password, user.password)
      if(!user || !decriptedPassword) return res.status(401).json('Credenciales no válidos')
  
      const generateToken = jwt.sign({id: user._id, roles: user.roles}, process.env.JWT_SECRET)
      await Token.create({token: generateToken, userId: user._id})
  
      res.status(200).json({user, token: generateToken})
    } catch (error) {
      return res.status(500).json(error)
    }
}

// 
//  Show user Profile
//
exports.profile = async(req, res) => {
    try {
      const user = await User.findById(req.user._id).populate('skins', {
        name: 1,
        imageURL: 1,
        _id: 0
      })
      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json(error)
    }
}

//  
//  Logout from this dispositive
// 
exports.logout = async (req, res) => {
    try {
      const token = await Token.deleteOne({token: req.token})
      return token.deletedCount === 1 ? res.status(200).json('Logout Completado') : res.status(401).json('Algo ha salido mal')
    } catch (error) {
      return res.status(500).json(error)
    }
}

// 
//  Logout from all dispositives
// 
exports.logoutAll = async (req, res) => {
    try {
      await Token.deleteMany({userId: req.user._id})
      return res.status(200).json('Logout de todos los dispositivos completado')
    } catch (error) {
      return res.status(500).json(error)
    }
}

//////////////////////////////////////////////////////////////

// 
// Buy new Skin
// 
exports.buySkin = async (req, res) => {
    try {
      const {skinId} = req.body;
  
      const user = await User.findById(req.user._id);
      Skins.findById(skinId)
        .then(response => {
          console.log(response);
          const comprobation = user.skins.filter(skin => skin == skinId)
          if (comprobation.length > 0) return res.status(401).json('You already have this skin')
          user.skins = user.skins.concat(skinId);
          user.coins = user.coins - response.value;
          user.save();
          return res.status(200).json('Skin comparada con éxito')
        })
        .catch(err => res.status(401).json("Skin non existent"))
    } catch (error) {
      return res.status(500).json(error)
    }
}