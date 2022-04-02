var mongoose = require('mongoose')
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var User = require('../models/Users');

exports.editProfile = async(req, res) => {
    try {
      const { alias, id } = req.body
  
      const user = await User.findOne({_id: id})
      user.alias = alias.length > 2 ? alias : user.alias
      user.save()
      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json(error)
    }
  }