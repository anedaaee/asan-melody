const request = require('../db/request')
const responseMessage = require('../functions/readMessage')
const CustomError = require('../functions/customErr')

exports.getOrgan = async (req)=> {
    try{
        const query = `SELECT * FROM organizations;`

        const result = await request(query,[],req)

        return result;

    }catch(err){throw err}
}