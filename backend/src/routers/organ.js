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
            "metadata": responseMessage(14),
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
        return res.status(400).send({
            "metadata": message
        })
    }
})
module.exports = router