const request = require('../db/request')
const responseMessage = require('../functions/readMessage')
const CustomError = require('../functions/customErr')
const { v4:uuidv4} =  require('uuid')
const path = require('path');
const fs = require('fs');

exports.reserve = async(req,values) => {
    try{
        const timestamp = new Date().getTime();

        let query = 'INSERT INTO asan_melody.reserved_class (`user`, class, `Date`) VALUES(?, ?, ?);'

        await request(query,[values.user, values.class , timestamp],req)
        
        query = 'SELECT * FROM asan_melody.reserved_class WHERE class = ? AND `user` = ?;'

        const result = await request(query,[ values.class , values.user],req)

        return result[0]
        
    }catch(err){throw err}
}

exports.deleteReserve = async(req,values) => {
    try{

        let query = 'DELETE FROM asan_melody.reserved_class WHERE class = ? AND `user` = ?;'

        await request(query,[ values.class , values.user],req)
        
        query = 'SELECT * FROM asan_melody.reserved_class WHERE class = ? AND `user` = ?;'

        const result = await request(query,[ values.class , values.user],req)
        
        return result[0]
        
    }catch(err){throw err}
}