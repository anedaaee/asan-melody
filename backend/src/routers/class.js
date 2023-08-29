const express = require('express')
const Joi = require('joi')
const responseMessage = require('../functions/readMessage')
const classCtrl = require('../controller/classCtrl')
const router = new express.Router()

router.post('/addClass' , async(req,res) => {
    try{
        const schema = Joi.object({
            teacher : Joi.string()
                .required(),
            name : Joi.string()
                .required(),
            description : Joi.string()
                .required(),
            price : Joi.number()
                .integer()
                .required(),
            address : Joi.string()
                .required(),
            organ : Joi.number()
                .integer()
                .required(),    
        })

        const values = await schema.validateAsync(req.query)

        const result = await classCtrl.addClass(req,values)
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
            if(err.details[0].path[0] === 'id') { message = responseMessage(14)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})
router.delete('/deleteClass' , async(req,res) => {
    try{
        const schema = Joi.object({
            classId : Joi.string()
                .required(),   
        })

        const values = await schema.validateAsync(req.body)

        const result = await classCtrl.deleteClass(req,values)
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
            if(err.details[0].path[0] === 'id') { message = responseMessage(14)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})
router.post('/refactorClass' , async(req,res) => {
    try{
        const schema = Joi.object({
            classId : Joi.string()
                .required(),   
        })

        const values = await schema.validateAsync(req.body)

        const result = await classCtrl.refactorClass(req,values)
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
            if(err.details[0].path[0] === 'id') { message = responseMessage(14)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})
router.get('/getClasses' , async(req,res) => {
    try{

        const result = await classCtrl.getClasses(req)

        res.status(200).send({
            "metadata": responseMessage(5),
            "body": {
                "type": "array",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(4)
        return res.status(400).send({
            "metadata": message
        })
    }
})
router.get('/getClassByClassId' , async(req,res) => {
    try{
        const schema = Joi.object({
            classId : Joi.string()
                .required(),   
        })

        const values = await schema.validateAsync(req.query)

        const result = await classCtrl.getClassById(req,values)
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
            if(err.details[0].path[0] === 'id') { message = responseMessage(14)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})
router.get('/getClassByOrgan' , async(req,res) => {
    try{
        const schema = Joi.object({
            organ : Joi.string()
                .required(),   
        })

        const values = await schema.validateAsync(req.query)

        const result = await classCtrl.getClassByOrgan(req,values)
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
            if(err.details[0].path[0] === 'id') { message = responseMessage(14)}
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
