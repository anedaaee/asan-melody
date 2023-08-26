const request = require('../db/request')
const responseMessage = require('../functions/readMessage')
const CustomError = require('../functions/customErr')

exports.getUser = async (req,values) => {
    try{

        const query = `SELECT username, first_name, last_name, email, 'role', phone FROM asan_melody.users where username = ?;`

        const result = await request(query , [values.username] , req)

        return result

    }catch(err){throw err}
}
exports.updateUser = async (req,values) => {
    try{

        let query = `UPDATE asan_melody.users
                    SET first_name=?, last_name=?, email=?, phone=?
                    WHERE username=?;`

        let result = await request(query , [values.firstName,values.lastName,values.email,values.phone,values.username] , req)

        query = `SELECT username, first_name, last_name, email, 'role', phone FROM asan_melody.users where username = ?;`

        result = await request(query , [values.username] , req)

        return result

    }catch(err){throw err}
}
exports.deleteUser= async (req,values) => {
    try{

        let query = `UPDATE asan_melody.users
                    SET is_active=0
                    WHERE username=?;`

        let result = await request(query , [values.username] , req)

        query = `SELECT username, first_name, last_name, email, 'role', phone , is_active FROM asan_melody.users where username = ?;`

        result = await request(query , [values.username] , req)

        return result

    }catch(err){throw err}
}