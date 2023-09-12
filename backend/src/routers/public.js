const express = require('express')
const Joi = require('joi')
const responseMessage = require('../functions/readMessage')
const publicCtr = require('../controller/publicCrtl')
const router = new express.Router()

router.get('/getGroupes' , async (req,res) => {
    try{
        const result = await publicCtr.getGroupes(req);

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

router.get('/getAssociations' , async (req,res) => {
    try{
        const result = await publicCtr.getAssociations(req);

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

router.get('/getAcademies' , async (req,res) => {
    try{
        const result = await publicCtr.getAcademies(req);

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

router.get('/getUser' , async (req,res) => {
    try{

        const schema = Joi.object({
            username: Joi.string()
                .required()
        })
        
        const values = await schema.validateAsync(req.query)

        const result = await publicCtr.getUser(req,values)

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