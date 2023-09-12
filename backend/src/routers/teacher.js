const express = require('express')
const Joi = require('joi')
const responseMessage = require('../functions/readMessage')
const teacherCtrl = require('../controller/teacherCtrl')
const router = new express.Router()

router.get('/getClasses' , async(req,res) => {
    try{
        const result = await teacherCtrl.getClasses(req)

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

        const result = await teacherCtrl.getSession(req,values)

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
router.post('/addSession' , async(req,res) => {
    try{

        const schema = Joi.object({
            class : Joi.string().required(),
            date : Joi.date().required(),
            description : Joi.string().required()
        })
        const values = await schema.validateAsync(req.body)

        const result = await teacherCtrl.addSession(req,values)

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
router.delete('/deleteSession' , async(req,res) => {
    try{

        const schema = Joi.object({
            class : Joi.string().required(),
            date : Joi.number().required()
        })
        const values = await schema.validateAsync(req.body)

        await teacherCtrl.deleteSession(req,values)

        res.status(200).send({
            "metadata": responseMessage(5),
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
