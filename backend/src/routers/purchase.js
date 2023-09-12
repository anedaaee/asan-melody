const express = require('express')
const Joi = require('joi')
const responseMessage = require('../functions/readMessage')
const purchaseCtrl = require('../controller/purchaseCtrl')
const router = new express.Router()

router.post('/reserve',async(req,res)=>{
    try{
        const schema = Joi.object({
            user : Joi.string()
                .required(),
            class : Joi.string()
                .required()
        })

        const values = await schema.validateAsync(req.body)

        const result = await purchaseCtrl.reserve(req,values)

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
            if(err.details[0].path[0] === 'user') { message = responseMessage(6)}
            if(err.details[0].path[0] === 'class') { message = responseMessage(29)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})

router.delete('/deleteReserve',async(req,res)=>{
    try{
        const schema = Joi.object({
            user : Joi.string()
                .required(),
            class : Joi.string()
                .required()
        })

        const values = await schema.validateAsync(req.body)

        const result = await purchaseCtrl.deleteReserve(req,values)

        res.status(200).send({
            "metadata": responseMessage(5),
            "body": {
                "type": "object",
                "data": result
            }
        })
    }catch(err){
        console.log(err);
        let message = responseMessage(4)
        if(err.details) {
            if(err.details[0].path[0] === 'user') { message = responseMessage(6)}
            if(err.details[0].path[0] === 'class') { message = responseMessage(29)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})
router.get('/getReserveByUser',async(req,res)=>{
    try{
        const schema = Joi.object({
            user : Joi.string()
                .required()
        })

        const values = await schema.validateAsync(req.query)

        const result = await purchaseCtrl.getReseveByUser(req,values)

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
router.get('/getReserveByOrgan',async(req,res)=>{
    try{
        const schema = Joi.object({
            organ : Joi.number()
                .integer()
                .required()
        })

        const values = await schema.validateAsync(req.query)

        const result = await purchaseCtrl.getReseveByOrgan(req,values)

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
            if(err.details[0].path[0] === 'organ') { message = responseMessage(30)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})
router.get('/getAllReserve',async(req,res)=>{
    try{
        const result = await purchaseCtrl.getAllReserve(req)

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
router.post('/purchase',async(req,res) => {
    try{
        const schema = Joi.object({
            user : Joi.string()
                .required(),
            class : Joi.string()
                .required()
        })
 

        const values = await schema.validateAsync(req.query)

        const result = await purchaseCtrl.purchase(req,values)

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
            if(err.details[0].path[0] === 'class') { message = responseMessage(29)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})
router.post('/admit',async(req,res) => {
    try{
        const schema = Joi.object({
            user : Joi.string()
                .required(),
            class : Joi.string()
                .required()
        })
 

        const values = await schema.validateAsync(req.body)

        const result = await purchaseCtrl.admit(req,values)

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
            if(err.details[0].path[0] === 'class') { message = responseMessage(29)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})
router.get('/getNonAdmitPurchases',async(req,res) => {
    try{

        const result = await purchaseCtrl.getNonAdmitPurchases(req)

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
router.get('/getUserClass',async(req,res) => {
    try{
        const schema = Joi.object({
            user : Joi.string()
                .required()
        })
 

        const values = await schema.validateAsync(req.query)

        const result = await purchaseCtrl.getUserClass(req,values)

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
router.get('/getUserPurchase',async(req,res) => {
    try{
        const schema = Joi.object({
            user : Joi.string()
                .required()
        })
 

        const values = await schema.validateAsync(req.query)

        const result = await purchaseCtrl.getUserPurchase(req,values)

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
