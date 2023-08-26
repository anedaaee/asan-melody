const express = require('express')
const Joi = require('joi')
const responseMessage = require('../functions/readMessage')
const authCtrl = require('../controller/authCtrl')
const router = new express.Router()
const passport = require('passport')
//require('../middleware/passport')(passport)

router.get('/' ,passport.authenticate('jwt', { session: false }),async(req,res) => {
    res.send('hiiiiiiiia')
})

router.post('/signup',async(req,res) => {
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
            password: Joi.string()
                .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&()])[A-Za-z\d@$!%*#?&()]{8,}$/),
            phone : Joi.number()
                .integer()
                .min(1000000000)
                .max(9999999999)
        })

        const values = await schema.validateAsync(req.body)
        const result = await authCtrl.signup(req,values)
        
        res.status(201).send({
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
            if(err.details[0].path[0] === 'password') { message = responseMessage(7)}
            if(err.details[0].path[0] === 'phone') { message = responseMessage(11)}
        }
        if(err.isCustom){
            message = responseMessage(3)
        }
        res.status(400).send(message)

    }
})
router.post('/signin', async (req, res , next) => {
    try{

        const schema = Joi.object({
            username: Joi.string()
                .required(),
            password: Joi.string()
                .required(),
        })
    
        const value = await schema.validateAsync(req.body)
           
        const result = await authCtrl.signin(req,value)

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
            if(err.details[0].path[0] === 'username') { message = responseMessage(6)}
            if(err.details[0].path[0] === 'password') { message = responseMessage(7)}
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