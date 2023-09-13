const request = require('../db/request')
const responseMessage = require('../functions/readMessage')
const CustomError = require('../functions/customErr')
const { v4:uuidv4} =  require('uuid')


exports.getClasses = async (req) => {
    try{
        let query = 'SELECT * FROM asan_melody.classes WHERE isActive=0 AND teacher = ? AND class_id IN (SELECT class FROM asan_melody.purchase WHERE admit = 1);'

        let class_infos = await request(query,[req.user.username],req)

        for(let i = 0 ; i < class_infos.length ; i++){
            let class_info = class_infos[i]

            query = 'SELECT * FROM asan_melody.organizations WHERE id = ?'

            let organ = await request(query,[class_info.organ],req)

            query = 'SELECT first_name,last_name FROM asan_melody.users WHERE username IN(SELECT user FROM asan_melody.purchase WHERE class = ? AND admit = 1);'

            let student = await request(query,[class_info.class_id],req)

            class_infos[i].organ_info = organ[0]
            class_infos[i].student = student

        }
        return class_infos
    }catch(err){throw err}
} 


exports.getSession = async (req,values) => {
    try{    
        let query = 'SELECT * FROM asan_melody.sessions WHERE class=? ;'

        const sessions = await request(query,[values.class],req)

        return sessions
    }catch(err){
        throw err
    }
}
exports.addSession = async (req,values) => {
    try{    

        let normalDate = new Date(values.date)

        let timestamp = await normalDate.getTime()

        let query = 'INSERT INTO asan_melody.sessions VALUES (?,?,?);'

        await request(query,[values.class,timestamp,values.description],req)
        
        query = 'SELECT * FROM asan_melody.sessions WHERE class=? AND date=?;'

        const session = await request(query,[values.class,timestamp],req)

        return session[0]

    }catch(err){
        throw err
    }
}
exports.deleteSession = async (req,values) => {
    try{    
        let query = 'DELETE FROM asan_melody.sessions WHERE class=? AND date=?;'

        await request(query,[values.class,values.date],req)
    }catch(err){
        throw err
    }
}

