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
