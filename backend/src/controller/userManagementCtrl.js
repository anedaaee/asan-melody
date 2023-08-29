const request = require('../db/request')
const responseMessage = require('../functions/readMessage')
const CustomError = require('../functions/customErr')

exports.addUserPermision = async (req,values) => {
    try{
        let query = `INSERT INTO asan_melody.user_management
                        (username, organ, permission)
                        VALUES(?, ?, ?);`

        await request(query,[values.username , values.organ , values.permission],req)

        query = `SELECT * FROM asan_melody.user_management WHERE username=? AND organ = ? ;`

        const result = await request(query,[values.username , values.organ],req)

        return result[0]
    }catch(err){throw err}
}
exports.deleteUserPermistion = async (req,values) => {
    try{
        let query = `DELETE FROM asan_melody.user_management
                WHERE username = ? AND organ = ? AND permission = ?;`

        await request(query,[values.username , values.organ , values.permission],req)

        query = `SELECT * FROM asan_melody.user_management WHERE username=? AND organ = ? ;`

        const result = await request(query,[values.username , values.organ],req)

        return result[0]
    }catch(err){throw err}
}
exports.getUserPermision = async (req,values) => {
    try{
        query = `SELECT * FROM asan_melody.user_management WHERE username=?;`

        const result = await request(query,[values.username],req)

        return result
    }catch(err){throw err}
}
exports.getUserPermisionbyPermission = async (req,values) => {
    try{
        query = `SELECT * FROM asan_melody.user_management WHERE permission=?;`

        const result = await request(query,[values.permission],req)

        return result
    }catch(err){throw err}
}
exports.getAllUserPermision = async (req) => {
    try{
        query = `SELECT * FROM asan_melody.user_management;`

        const result = await request(query,[],req)

        return result
    }catch(err){throw err}
}
exports.getPermisions = async (req) => {
    try{
        query = `SELECT * FROM asan_melody.permissions;`

        const result = await request(query,[],req)

        return result
    }catch(err){throw err}
}