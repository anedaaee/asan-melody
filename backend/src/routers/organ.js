const express = require('express')
const Joi = require('joi')
const responseMessage = require('../functions/readMessage')
const organCtrl = require('../controller/organCtrl')
const router = new express.Router()

router.get('/getOrgans' , async (req,res) => {
    try{
        const result = await organCtrl.getOrgan(req);

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