const express = require('express')
const Joi = require('joi')
const responseMessage = require('../functions/readMessage')
const organCtrl = require('../controller/organCtrl')
const router = new express.Router()

router.get('/getUserInfo' , async (req,res) => {
    try{
 
        res.status(200).send({
            "metadata": responseMessage(5),
            "body": {
                "type": "object",
                "data": ''
            }
        })

    }catch(err){
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