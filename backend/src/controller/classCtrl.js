const request = require('../db/request')
const responseMessage = require('../functions/readMessage')
const CustomError = require('../functions/customErr')
const { v4:uuidv4} =  require('uuid')
const path = require('path');
const fs = require('fs');

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
                        (class_id, teacher, name, description, price, address, image, isActive, organ)
                        VALUES(?, ?, ?, ?, ?, ?, ?, 1, ?);`
        
        await request(query,[values.classId , values.teacher , values.name ,values.description ,values.price ,values.address ,values.image ,values.organ],req)



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
                    image : class_image_path,
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

        await request(query,[values.calssId],req)

        return await getClassById(req,values.classId)
    }catch(err){throw err}
}