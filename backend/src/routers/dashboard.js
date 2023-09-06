const express = require('express')
const Joi = require('joi')
const responseMessage = require('../functions/readMessage')
const dashBoardCtrl = require('../controller/dashboardCtrl')
const router = new express.Router()

router.get('/getNumberOfUsers' , async(req,res) => {
    try{

        const result = await dashBoardCtrl.getNumberOfUsers(req)

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
router.get('/getNumberOfOrgan' , async(req,res) => {
    try{

        const result = await dashBoardCtrl.getNumberOfOrgan(req)

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
router.get('/getNumberOfPurchase' , async(req,res) => {
    try{

        const result = await dashBoardCtrl.getNumberOfPurchase(req)

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
router.get('/getTotalAmount' , async(req,res) => {
    try{

        const result = await dashBoardCtrl.getTotalAmount(req)

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