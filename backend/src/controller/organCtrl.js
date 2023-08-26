const request = require('../db/request')
const responseMessage = require('../functions/readMessage')
const CustomError = require('../functions/customErr')

exports.getOrgans = async (req)=> {
    try{
        const query = `SELECT * FROM organizations;`

        const result = await request(query,[],req)

        return result;

    }catch(err){throw err}
}
exports.getOrganById = async (req , values)=> {
    try{
        const query = `SELECT * FROM organizations WHERE id = ?;`

        const result = await request(query,[values.id],req)

        return result[0];

    }catch(err){throw err}
}