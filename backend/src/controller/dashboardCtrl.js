const request = require('../db/request')
const responseMessage = require('../functions/readMessage')
const CustomError = require('../functions/customErr')
const { v4:uuidv4} =  require('uuid')
const path = require('path');
const fs = require('fs');


exports.getNumberOfUsers = async (req) => {
    try{
        const query = `SELECT COUNT(username) AS number_of_user FROM asan_melody.users;`

        const result = await request(query,[],req)

        return result[0]
    }catch(err){throw err}
}

exports.getNumberOfOrgan = async (req) => {
    try{
        const query = `SELECT COUNT(id) AS number_of_organ FROM asan_melody.organizations;`

        const result = await request(query,[],req)

        return result[0]

    }catch(err) {throw err}
}

exports.getNumberOfPurchase = async (req) => {
    try{
        const query = 'SELECT COUNT(`user`) AS number_of_class FROM asan_melody.purchase WHERE admit = 1;'

        const result = await request(query,[],req)

        return result[0]
        
    }catch(err) {throw err}
}
exports.getTotalAmount = async (req) => {
    try{
        const query = `SELECT CONCAT(SUM(price),' IRR') AS total_amount FROM asan_melody.classes WHERE class_id IN (SELECT class AS class_id FROM asan_melody.purchase WHERE admit = 1);`

        const result = await request(query,[],req)

        return result[0]
        
    }catch(err) {throw err}
}
exports.getTotalAmountPerDay = async (req) => {
    try{
        const query = `SELECT CONCAT(SUM(price),' IRR') AS total_amount FROM asan_melody.classes WHERE class_id IN (SELECT class AS class_id FROM asan_melody.purchase WHERE admit = 1);`

        const result = await request(query,[],req)

        return result[0]
        
    }catch(err) {throw err}
}