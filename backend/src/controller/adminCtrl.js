const request = require('../db/request')
const responseMessage = require('../functions/readMessage')
const CustomError = require('../functions/customErr')
const { v4:uuidv4} =  require('uuid')
const path = require('path');
const fs = require('fs');

exports.getClasses = async (req) =>{
    try{
        let query = 'SELECT * FROM asan_melody.classes WHERE organ IN( SELECT DISTINCT organ FROM asan_melody.user_management WHERE username = ?);'

        const classes = await request(query,[req.user.username],req)

        return classes
    }catch(err){throw err}
}
getClassById = async (req,class_id) => {
    try{
        const query = `SELECT * FROM asan_melody.classes WHERE class_id=?;`

        const result = await request(query,[class_id],req)

        return result[0]

    }catch(err){throw err}
}
addClassToDb = async (req,values) => {
    try{
 
        const query = `INSERT INTO asan_melody.classes
                        (class_id, teacher, name, description, price, address, image, isActive, organ , number)
                        VALUES(?, ?, ?, ?, ?, ?, ?, 1, ?,?);`
        
        await request(query,[values.classId , values.teacher , values.name ,values.description ,values.price ,values.address ,values.image ,values.organ , values.number],req)



    }catch(err){throw err}
}

exports.addClass = async (req,values) => {
    try{
        const classId = await uuidv4()

        const files = req.files;

        if(files['class_image']){
            
            const class_image = files['class_image']

            const destinationPath = path.join(__dirname, '../..', '/classes_image');

            const class_image_ext = class_image.name.split('.').pop()

            const class_image_name = classId +'.'+class_image_ext;

            if(class_image_ext==='jpg' || class_image_ext==='jpeg' || class_image_ext==='png'){
                
                class_image.name = class_image_name

                const class_image_path = path.join(destinationPath,class_image_name)

                const newValues = {
                    classId : classId ,
                    image : '/classes_image/'+class_image_name,
                    ...values
                }

                await addClassToDb(req,newValues)

                await fs.promises.writeFile(class_image_path , class_image.data)

                return await getClassById(req,classId)
            }else{
                throw CustomError('file format error' , responseMessage(16))
            }
        }else{
            throw CustomError('file error' , responseMessage(15))
        }



    }catch(err){throw err}
}
exports.deleteClass = async (req,values) => {
    try{
        const query = `UPDATE asan_melody.classes SET isActive=0 WHERE class_id = ?;`

        await request(query,[values.classId],req)

        return await getClassById(req,values.classId)
    }catch(err){throw err}
}

exports.refactorClass = async (req,values) => {
    try{
        const query = `UPDATE asan_melody.classes SET isActive=1 WHERE class_id = ?;`

        await request(query,[values.classId],req)

        return await getClassById(req,values.classId)
    }catch(err){throw err}
}

exports.admit = async (req,values) => {
    try{
        let query = 'UPDATE asan_melody.purchase SET admit=1 WHERE `user`=? AND class=?;'

        await request(query,[ values.user , values.class],req)

        query = 'SELECT * FROM asan_melody.purchase WHERE `user`=? AND class = ?;'

        const result =  await request(query,[values.user,values.class],req)

        return result[0]

    }catch(err){throw err}
}
exports.getPurchases = async (req) => {
    try{
        let query = 'SELECT * FROM asan_melody.purchase WHERE class  IN (SELECT class_id FROM asan_melody.classes WHERE organ IN( SELECT DISTINCT organ FROM asan_melody.user_management WHERE username = ?));'

        const result =  await request(query,[req.user.username],req)

        return result
    }catch(err){throw err}
}

addPostTODb = async (req,values) => {
    try{
        const timestamp = new Date().getTime();

        const query = 'INSERT INTO asan_melody.posts ( organ, description, title, file, isActive, `date`) VALUES(?, ?, ?, ?, 1, ?);'

        await request(query,[values.organ,values.description,values.title,values.image,timestamp],req)
    
    }catch(err){throw err}
}

exports.addPost = async (req,values) => {
    try{
        const files = req.files;

        if(files['post']){
            const postId = uuidv4()
            
            const post = files['post']

            const destinationPath = path.join(__dirname, '../..', '/posts');

            const post_ext = post.name.split('.').pop()

            const post_name = postId +'.'+post_ext;

            if(post_ext==='jpg' || post_ext==='jpeg' || post_ext==='png'){
                
                post.name = post_name

                const post_path = path.join(destinationPath,post_name)

                const newValues = {
                    image : '/posts/' + post_name,
                    ...values
                }

                await addPostTODb(req,newValues)

                await fs.promises.writeFile(post_path , post.data)

            }else{
                throw CustomError('file format error' , responseMessage(16))
            }
        }else{
            throw CustomError('file error' , responseMessage(15))
        }
    }catch(err){throw err}
}

exports.deletePost = async (req,values) => {
    try{

        const query = 'UPDATE asan_melody.posts SET isActive=0 WHERE id=?';
        await request(query,[values.id],req)
    
    }catch(err){throw err}
}
exports.refactorePost = async (req,values) => {
    try{

        const query = 'UPDATE asan_melody.posts SET isActive=1 WHERE id=?';
        await request(query,[values.id],req)
    
    }catch(err){throw err}
}
exports.getOrgans = async (req) => {
    try{

        const query = 'SELECT * FROM asan_melody.organizations WHERE id IN ( SELECT DISTINCT organ FROM asan_melody.user_management WHERE username = ?)';
        return await request(query,[req.user.username],req)
        
    }catch(err){throw err}
}
exports.getPostsByOrgan = async (req,values) => {
    try{

        const query = 'SELECT * FROM asan_melody.posts WHERE organ = ?  ORDER BY `date` DESC  ';
        return await request(query,[values.organ],req)
    
    }catch(err){throw err}
}
