const express = require('express')
const Joi = require('joi')
const responseMessage = require('../functions/readMessage')
const adminCtrl = require('../controller/adminCtrl')
const router = new express.Router()

router.get('/getClasses' , async(req,res) => {
    try{
        const result = await adminCtrl.getClasses(req)

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
            number : Joi.number()
                .integer()
                .required()  
        })

        const values = await schema.validateAsync(req.query)

        const result = await adminCtrl.addClass(req,values)
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
            if(err.details[0].path[0] === 'teacher') { message = responseMessage(23)}
            if(err.details[0].path[0] === 'name') { message = responseMessage(24)}
            if(err.details[0].path[0] === 'description') { message = responseMessage(25)}
            if(err.details[0].path[0] === 'price') { message = responseMessage(26)}
            if(err.details[0].path[0] === 'address') { message = responseMessage(27)}
            if(err.details[0].path[0] === 'organ') { message = responseMessage(28)}
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

        const result = await adminCtrl.deleteClass(req,values)
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
router.post('/refactorClass' , async(req,res) => {
    try{
        const schema = Joi.object({
            classId : Joi.string()
                .required(),   
        })

        const values = await schema.validateAsync(req.body)

        const result = await adminCtrl.refactorClass(req,values)
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
router.post('/admit',async(req,res) => {
    try{
        const schema = Joi.object({
            user : Joi.string()
                .required(),
            class : Joi.string()
                .required()
        })
 

        const values = await schema.validateAsync(req.body)

        const result = await adminCtrl.admit(req,values)

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
router.get('/getPurchases',async(req,res) => {
    try{

        const result = await adminCtrl.getPurchases(req)

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
router.post('/addPosts',async(req,res) => {
    try{
        const schema = Joi.object({
            organ : Joi.number().integer().required(),
            description : Joi.string().required(),
            title : Joi.string().required(),
        })
        const values = await schema.validateAsync(req.query)
        
        await adminCtrl.addPost(req,values)

        res.status(200).send({
            "metadata": responseMessage(5),
        })
    }catch(err){
        console.log(err);
        let message = responseMessage(4)
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})

router.delete('/deletePosts',async(req,res) => {
    try{
        const schema = Joi.object({
            id : Joi.number().integer().required()
        })
        const values = await schema.validateAsync(req.body)
        
        await adminCtrl.deletePost(req,values)

        res.status(200).send({
            "metadata": responseMessage(5),
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
router.put('/refactorePosts',async(req,res) => {
    try{
        const schema = Joi.object({
            id : Joi.number().integer().required()
        })
        const values = await schema.validateAsync(req.body)
        
        await adminCtrl.refactorePost(req,values)

        res.status(200).send({
            "metadata": responseMessage(5),
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
router.get('/getPostsByOrgan',async(req,res) => {
    try{
        const schema = Joi.object({
            organ : Joi.number().integer().required()
        })
        const values = await schema.validateAsync(req.query)
        
        const result = await adminCtrl.getPostsByOrgan(req,values)

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
router.get('/getOrgans',async(req,res) => {
    try{

        const result = await adminCtrl.getOrgans(req)

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