const express = require('express')
const Joi = require('joi')
const responseMessage = require('../functions/readMessage')
const purchaseCtrl = require('../controller/purchaseCtrl')
const router = new express.Router()

module.exports = router
