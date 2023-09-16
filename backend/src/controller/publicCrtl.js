const request = require('../db/request')
const responseMessage = require('../functions/readMessage')
const CustomError = require('../functions/customErr')
const utils = require('../functions/utils')

exports.getGroupes = async (req)=> {
    try{
        
        let query = `SELECT * FROM organizations WHERE type = 'group' AND isActive=1;`

        let organs = await request(query,[],req)

        let result = []

        for (const organ of organs) {
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
        return result;

    }catch(err){throw err}
}

exports.getAssociations = async (req)=> {
    try{
        let query = `SELECT * FROM organizations WHERE type = 'association' AND isActive=1;`

        let organs = await request(query,[],req)

        let result = []

        for (const organ of organs) {
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
        return result;


    }catch(err){throw err}
}

exports.getAcademies = async (req)=> {
    try{

        let query = `SELECT * FROM organizations WHERE type = 'academy' AND isActive=1;`

        let organs = await request(query,[],req)

        let result = []

        for (const organ of organs) {
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
        return result;



    }catch(err){throw err}
}

exports.getUser = async (req , values) => {
    try{

        const query = 'SELECT first_name, last_name, email, phone FROM asan_melody.users where username = ?;'

        const result = await request(query , [values.username] , req)

        return result

    }catch(err){throw err}
}