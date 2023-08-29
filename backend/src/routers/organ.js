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

        await organCtrl.addOrgan(req,values);

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
module.exports = router