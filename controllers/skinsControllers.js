var Skins = require('../models/Skins');

// 
// Show all skins
// 
exports.showSkins = async (req, res) => {
    try {
        const skins = await Skins.find({})
        skins.length > 0 ? res.status(200).json(skins) : res.status(200).json('No hay ningúna skin')
    } catch (error) {
        return res.status(500).json(error)
    }
}

// 
// Create new skin
// 
exports.createSkin = async (req, res) => {
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
}