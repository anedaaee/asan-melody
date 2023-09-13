const express = require('express')
const Joi = require('joi')
const responseMessage = require('../functions/readMessage')
const studentCtrl = require('../controller/studentCrel')
const router = new express.Router()

router.get('/getClasses' , async(req,res) => {
    try{
        const result = await studentCtrl.getClasses(req)

        res.status(200).send({
            "metadata": responseMessage(5),
            "body": {
                "type": "array",
                "data": result
            }
        })
    }catch(err){
        console.log(err);
        let message = responseMessage(4)
        if(err.details) {
            if(err.details[0].path[0] === 'username') { message = responseMessage(6)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})
router.get('/getSession' , async(req,res) => {
    try{
        const schema = Joi.object({
            class : Joi.string().required()
        })
        const values = await schema.validateAsync(req.query)

        const result = await studentCtrl.getSession(req,values)

        res.status(200).send({
            "metadata": responseMessage(5),
            "body": {
                "type": "array",
                "data": result
            }
        })
    }catch(err){
        console.log(err);
        let message = responseMessage(4)
        if(err.details) {
            if(err.details[0].path[0] === 'username') { message = responseMessage(6)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})
router.get('/getOrganById' , async (req,res) => {
    try{
        const schema = Joi.object({
            id : Joi.number()
                .integer()
                .required()
        })

        const values = await schema.validateAsync(req.query)

        const result = await studentCtrl.getOrganById(req,values);

        res.status(200).send({
            "metadata": responseMessage(5),
            "body": {
                "type": "object",
                "data": result
            }
        })

    }catch(err){
        let message = responseMessage(4)
        if(err.isCustom){
            message = err.reason
        }
        if(err.details) {
            if(err.details[0].path[0] === 'id') { message = responseMessage(14)}
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})
router.get('/getFavourite' , async (req,res) => {
    try{

        const result = await studentCtrl.getFavourite(req);

        res.status(200).send({
            "metadata": responseMessage(5),
            "body": {
                "type": "array",
                "data": result
            }
        })

    }catch(err){
        let message = responseMessage(4)
        if(err.isCustom){
            message = err.reason
        }
        if(err.details) {
            if(err.details[0].path[0] === 'id') { message = responseMessage(14)}
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

        const result = await studentCtrl.getClassByOrgan(req,values)
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
            if(err.details[0].path[0] === 'classId') { message = responseMessage(29)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})
router.get('/getPostsByOrgan',async(req,res) => {
    try{
        const schema = Joi.object({
            organ : Joi.number().integer().required()
        })
        const values = await schema.validateAsync(req.query)
        
        const result = await studentCtrl.getPostsByOrgan(req,values)

        res.status(200).send({
            "metadata": responseMessage(5),
            "body": {
                "type": "array",
                "data": result
            }
        })
    }catch(err){
        let message = responseMessage(4)
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})
module.exports = router