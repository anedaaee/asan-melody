const request = require('../db/request')
const responseMessage = require('../functions/readMessage')
const CustomError = require('../functions/customErr')
const { v4:uuidv4} =  require('uuid')


exports.getClasses = async (req) => {
   try{
        let query = 'SELECT * FROM asan_melody.classes WHERE isActive = 0 AND class_id IN (SELECT class FROM asan_melody.purchase WHERE `user` = ? AND admit = 1);'

        let classes = await request(query,[req.user.username],req)

        for (let i = 0 ; i < classes.length ; i++) {
            let class_ = classes[i]

            query = 'SELECT first_name,last_name,email,phone FROM asan_melody.users WHERE username = ?'

            let teacher = await request(query,[class_.teacher],req)

            query = 'SELECT * FROM asan_melody.organizations WHERE id = ?'

            let organ = await request(query,[class_.organ],req)

            classes[i].teacher_info = teacher[0]
            classes[i].organ_info = organ[0]
        }

        return classes

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
exports.getFavourite = async (req) => {
    try{    
        let query = 'SELECT * FROM asan_melody.organizations WHERE id IN (SELECT organ_id as id FROM asan_melody.fallowed_organ WHERE `user` = ?)'

        let sessions = await request(query,[req.user.username],req)

        let result = []

        for (const organ of sessions) {
            query = 'SELECT COUNT(`user`) AS follower FROM asan_melody.fallowed_organ WHERE organ_id = ?'

            let follower = await request(query,[organ.id],req)

            query = 'SELECT COUNT(class_id) AS no_classes FROM asan_melody.classes WHERE organ = ? AND isActive=1'

            let no_classes = await request(query,[organ.id],req)
            
            query = 'SELECT COUNT(id) AS no_posts FROM asan_melody.posts WHERE organ = ? AND isActive=1'

            let no_posts = await request(query,[organ.id],req)

            result.push({
                ...organ,
                follower : follower[0].follower,
                no_classes : no_classes[0].no_classes,
                no_posts : no_posts[0].no_posts
            })
        }
        return result
    }catch(err){
        throw err
    }
}
exports.getPostsByOrgan = async (req,values) => {
    try{

        const query = 'SELECT * FROM asan_melody.posts WHERE organ = ? AND isActive=1 ORDER BY `date` DESC  ';
        return await request(query,[values.organ],req)
    
    }catch(err){throw err}
}
exports.getClassByOrgan = async (req,values) => {
    try{
        const query = `SELECT * FROM asan_melody.classes WHERE organ=? AND isActive=1;`

        const result = await request(query,[values.organ],req)

        return result
    }catch(err){throw err}
}
exports.getOrganById = async (req , values)=> {
    try{
        const query = `SELECT * FROM organizations WHERE id = ?;`

        const result = await request(query,[values.id],req)

        return result[0];

    }catch(err){throw err}
}