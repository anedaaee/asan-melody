const express = require('express')
const responseMessage = require('../functions/readMessage')
const router = new express.Router()
const fs = require('fs')


router.get('/getFile',async(req,res) => {
    try{
        if(req.query.link.substring(0,42) === `/home/neso/aliproject/asan_melody/backend/`){
            res.sendFile(req.query.link, { headers: { 'Content-Type': 'image/jpeg' } });
        }else{
            let message = responseMessage(32)
            return res.status(400).send({
                "metadata": message
            })
        }
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