var express = require('express');
var router = express.Router();

var Skins = require('../models/Skins');

// 
// Show all skins
// 
router.get('/', async (req, res) => {
    try {
        const skins = await Skins.find({})
        skins.length > 0 ? res.status(200).json(skins) : res.status(200).json('No hay ningúna skin')
    } catch (error) {
        return res.status(500).json(error)
    }
});

// 
// Create new skin
// 
router.post('/newSkin', async (req, res) => {
    try {
        const {name, value, imageURL} = req.body;
        const newSkin = await Skins.create({
            name: name,
            value: value,
            imageURL: imageURL
        })
        newSkin !== null ? res.status(200).json(newSkin) : res.status(401).json('Rellena el campo requerido')
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports = router