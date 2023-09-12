const express = require('express')
const Joi = require('joi')
const responseMessage = require('../functions/readMessage')
const organCtrl = require('../controller/organCtrl')
const router = new express.Router()

router.get('/getOrgans' , async (req,res) => {
    try{
        const result = await organCtrl.getOrgans(req);

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
router.get('/getOrganById' , async (req,res) => {
    try{
        const schema = Joi.object({
            id : Joi.number()
                .integer()
                .required()
        })

        const values = await schema.validateAsync(req.query)

        const result = await organCtrl.getOrganById(req,values);

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
router.get('/getFollowdOrgan' , async (req,res) => {
    try{
        const schema = Joi.object({
            username : Joi.string()
                .required()
        })
        const values = await schema.validateAsync(req.query)

        const result = await organCtrl.getFollowdOrgan(req,values);
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
            if(err.details[0].path[0] === 'username') { message = responseMessage(6)}
        }
        return res.status(400).send({
            "metadata": message
        })
    }
})

router.post('/addOrgan' , async (req,res) => {
    try{
        const schema = Joi.object({
            name : Joi.string()
                .required(),
            manager : Joi.string()
                .required(),
            address : Joi.string()
                .required(),
            phone : Joi.string()
                .required(),
            type : Joi.string()
                .required(),        
            description : Joi.string()
                .required(),      
        })

        const values = await schema.validateAsync(req.query)

        const result = await organCtrl.addOrgan(req,values);

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
            if(err.details[0].path[0] === 'name') { message = responseMessage(17)}
            if(err.details[0].path[0] === 'manager') { message = responseMessage(18)}
            if(err.details[0].path[0] === 'address') { message = responseMessage(19)}
            if(err.details[0].path[0] === 'phone') { message = responseMessage(20)}
            if(err.details[0].path[0] === 'type') { message = responseMessage(21)}
            if(err.details[0].path[0] === 'description') { message = responseMessage(22)}
        }
        if(err.isCustom){
            message = err.reason
        }
        return res.status(400).send({
            "metadata": message,
        })
    }
})

router.patch('/updateProfileImage' , async (req,res) => {
    try{
        console.log('hi');
        const schema = Joi.object({
            id : Joi.number()
                .integer()
                .required()
        })

        const values = await schema.validateAsync(req.query)

        const result = await organCtrl.updateProfile_image(req,values);

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
router.patch('/updateBackgroundImage' , async (req,res) => {
    try{
        const schema = Joi.object({
            id : Joi.number()
                .integer()
                .required()
        })

        const values = await schema.validateAsync(req.query)

        const result = await organCtrl.updateBackground_image(req,values);

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
router.patch('/updateOrgan' , async (req,res) => {
    try{
        const schema = Joi.object({
            id : Joi.number()
                .integer()
                .required(),
            name : Joi.string()
                .required(),
            manager : Joi.string()
                .required(),
            address : Joi.string()
                .required(),
            phone : Joi.string()
                .required(),       
            description : Joi.string()
                .required(),      
        })

        const values = await schema.validateAsync(req.query)

        const result = await organCtrl.updateOrgan(req,values);

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
            if(err.details[0].path[0] === 'name') { message = responseMessage(17)}
            if(err.details[0].path[0] === 'manager') { message = responseMessage(18)}
            if(err.details[0].path[0] === 'address') { message = responseMessage(19)}
            if(err.details[0].path[0] === 'phone') { message = responseMessage(20)}
            if(err.details[0].path[0] === 'description') { message = responseMessage(22)}
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
router.delete('/deleteOrgan' , async (req,res) => {
    try{
        const schema = Joi.object({
            id : Joi.number()
                .integer() 
                .required()     
        })

        const values = await schema.validateAsync(req.query)

        const result = await organCtrl.deleteOrgan(req,values);

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
router.put('/refactorOrgan' , async (req,res) => {
    try{
        const schema = Joi.object({
            id : Joi.number()
                .integer() 
                .required()     
        })

        const values = await schema.validateAsync(req.query)

        const result = await organCtrl.refactorOrgan(req,values);

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
router.post('/followOrgan',async(req,res) => {
    try{
        const schema = Joi.object({
            organ : Joi.number()
                .integer()
                .required(),
            username : Joi.string()
                .required()
        })

        const values = await schema.validateAsync(req.body)

        const result = await organCtrl.followOrgan(req,values);

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
            if(err.details[0].path[0] === 'organ') { message = responseMessage(14)}
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
router.delete('/unfollowOrgan',async(req,res) => {
    try{
        const schema = Joi.object({
            organ : Joi.number()
                .integer()
                .required(),
            username : Joi.string()
                .required()
        })

        const values = await schema.validateAsync(req.body)

        await organCtrl.unfollowOrgan(req,values);

        res.status(200).send({
            "metadata": responseMessage(5),
        })
    }catch(err){
        let message = responseMessage(4)
        if(err.details) {
            if(err.details[0].path[0] === 'organ') { message = responseMessage(14)}
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
module.exports = router