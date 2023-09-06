const express = require('express')
const Joi = require('joi')
const responseMessage = require('../functions/readMessage')
const userCtrl = require('../controller/userCtrl')
const router = new express.Router()

router.get('/getUserInfo' , async (req,res) => {
    try{
        const result = await userCtrl.getUser(req)

        res.status(200).send({
            "metadata": responseMessage(5),
            "body": {
                "type": "object",
                "data": result[0]
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
router.get('/getUsers' , async (req,res) => {
    try{
        const result = await userCtrl.getUsers(req)

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
router.get('/getUsersAllDetail' , async (req,res) => {
    try{
        const result = await userCtrl.getUsersAllDetail(req)

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
router.patch('/updateUserInfo' , async(req,res) => {
    try{
        const schema = Joi.object({
            firstName: Joi.string()
                .min(3)
                .max(30)
                .required(),
            lastName: Joi.string()
                .min(3)
                .max(30)
                .required(),
            email: Joi.string()
                .email()
                .required(),
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
            phone : Joi.number()
                .integer()
                .min(1000000000)
                .max(9999999999),
            role : Joi.string()
                .required()
        })

        const values = await schema.validateAsync(req.body)

        const result = await userCtrl.updateUser(req,values)

        res.status(200).send({
            "metadata": responseMessage(5),
            "body": {
                "type": "object",
                "data": result[0]
            }
        })
    }catch(err){
        let message = responseMessage(4)
        if(err.details) {
            if(err.details[0].path[0] === 'firstName') { message = responseMessage(9)}
            if(err.details[0].path[0] === 'lastName') { message = responseMessage(10)}
            if(err.details[0].path[0] === 'email') { message = responseMessage(8)}
            if(err.details[0].path[0] === 'username') { message = responseMessage(6)}
            if(err.details[0].path[0] === 'phone') { message = responseMessage(11)}
        }
        if(err.isCustom){
            message = responseMessage(3)
        }
        res.status(400).send(message)

    }
})
router.delete('/deleteUserInfo' , async (req,res) => {
    try{
        const schema = Joi.object({
            username : Joi.string()
                .required()
        })
        
        const values = await schema.validateAsync(req.body)

        const result = await userCtrl.deleteUser(req,values)

        res.status(200).send({
            "metadata": responseMessage(5),
            "body": {
                "type": "object",
                "data": result[0]
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
router.put('/refactorUserInfo' , async (req,res) => {
    try{
        const schema = Joi.object({
            username : Joi.string()
                .required()
        })
        
        const values = await schema.validateAsync(req.body)

        const result = await userCtrl.refactor(req,values)

        res.status(200).send({
            "metadata": responseMessage(5),
            "body": {
                "type": "object",
                "data": result[0]
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
module.exports = router