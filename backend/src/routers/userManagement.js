const express = require('express')
const Joi = require('joi')
const responseMessage = require('../functions/readMessage')
const userManagementCtrl = require('../controller/userManagementCtrl')
const router = new express.Router()

router.post('/addUserPermision' , async (req,res) => {
    try{
        const schema = Joi.object({
            username : Joi.string().required(),
            organ : Joi.number().integer(),
            permission : Joi.string().required()
        })

        const values = await schema.validateAsync(req.body)

        const result = await userManagementCtrl.addUserPermision(req,values)
        res.status(200).send({
            "metadata": responseMessage(5),
            "body": {
                "type": "object",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(4)
        if(err.details) {
            if(err.details[0].path[0] === 'username') { message = responseMessage(6)}
            if(err.details[0].path[0] === 'organ') { message = responseMessage(30)}
            if(err.details[0].path[0] === 'permission') { message = responseMessage(31)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})
router.delete('/deleteUserPermistion' , async (req,res) => {
    try{
        const schema = Joi.object({
            username : Joi.string().required(),
            organ : Joi.number().integer(),
            permission : Joi.string().required()
        })

        const values = await schema.validateAsync(req.body)

        const result = await userManagementCtrl.deleteUserPermistion(req,values)
        res.status(200).send({
            "metadata": responseMessage(5),
            "body": {
                "type": "object",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(4)
        if(err.details) {
            if(err.details[0].path[0] === 'username') { message = responseMessage(6)}
            if(err.details[0].path[0] === 'organ') { message = responseMessage(30)}
            if(err.details[0].path[0] === 'permission') { message = responseMessage(31)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})
router.get('/getUserPermision' , async (req,res) => {
    try{
        const schema = Joi.object({
            username : Joi.string().required()
        })

        const values = await schema.validateAsync(req.query)

        const result = await userManagementCtrl.getUserPermision(req,values)
        res.status(200).send({
            "metadata": responseMessage(5),
            "body": {
                "type": "array",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(4)
        if(err.details) {
            if(err.details[0].path[0] === 'user') { message = responseMessage(6)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})
router.get('/getUserDistinctPermision' , async (req,res) => {
    try{
        const schema = Joi.object({
            username : Joi.string().required()
        })

        const values = await schema.validateAsync(req.query)

        const result = await userManagementCtrl.getUserDistinctPermision(req,values)
        res.status(200).send({
            "metadata": responseMessage(5),
            "body": {
                "type": "array",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(4)
        if(err.details) {
            if(err.details[0].path[0] === 'user') { message = responseMessage(6)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})
router.get('/getUserPermisionbyPermission' , async (req,res) => {
    try{
        const schema = Joi.object({
            permission : Joi.string().required()
        })

        const values = await schema.validateAsync(req.query)

        const result = await userManagementCtrl.getUserPermisionbyPermission(req,values)
        res.status(200).send({
            "metadata": responseMessage(5),
            "body": {
                "type": "array",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(4)
        if(err.details) {
            if(err.details[0].path[0] === 'permission') { message = responseMessage(31)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})
router.get('/getUserPermisionbyPermissionAndOrgan' , async (req,res) => {
    try{
        const schema = Joi.object({
            permission : Joi.string().required(),
            organ : Joi.number().integer().required(),
        })

        const values = await schema.validateAsync(req.query)

        const result = await userManagementCtrl.getUserPermisionbyPermissionAndOrgan(req,values)
        res.status(200).send({
            "metadata": responseMessage(5),
            "body": {
                "type": "array",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(4)
        if(err.details) {
            if(err.details[0].path[0] === 'permission') { message = responseMessage(31)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})
router.get('/getAllUserPermision' , async (req,res) => {
    try{

        const result = await userManagementCtrl.getAllUserPermision(req)
        res.status(200).send({
            "metadata": responseMessage(5),
            "body": {
                "type": "array",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(4)
        if(err.details) {
            if(err.details[0].path[0] === 'user') { message = responseMessage(6)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})
router.get('/getPermisions' , async (req,res) => {
    try{

        const result = await userManagementCtrl.getPermisions(req)
        res.status(200).send({
            "metadata": responseMessage(5),
            "body": {
                "type": "array",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(4)
        if(err.details) {
            if(err.details[0].path[0] === 'user') { message = responseMessage(6)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})
module.exports = router