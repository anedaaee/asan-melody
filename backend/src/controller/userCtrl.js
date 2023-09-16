const request = require('../db/request')
const responseMessage = require('../functions/readMessage')
const CustomError = require('../functions/customErr')

const { v4:uuidv4} =  require('uuid')
const path = require('path');
const fs = require('fs');

exports.getUser = async (req) => {
    try{

        const query = 'SELECT username, first_name, last_name, email, `role`, phone FROM asan_melody.users where username = ?;'

        const result = await request(query , [req.user.username] , req)

        return result

    }catch(err){throw err}
}
exports.updateUser = async (req,values) => {
    try{

        let query = 'UPDATE asan_melody.users SET first_name=?, last_name=?, email=?, phone=? , `role`=? WHERE username=?;'

        let result = await request(query , [values.firstName,values.lastName,values.email,values.phone,values.role,values.username] , req)

        query = 'SELECT username, first_name, last_name, email, `role`, phone FROM asan_melody.users where username = ?;'

        result = await request(query , [values.username] , req)

        return result

    }catch(err){
        console.log(err);
        throw err}
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
exports.refactor= async (req,values) => {
    try{

        let query = `UPDATE asan_melody.users
                    SET is_active=1
                    WHERE username=?;`

        let result = await request(query , [values.username] , req)

        query = `SELECT username, first_name, last_name, email, 'role', phone , is_active FROM asan_melody.users where username = ?;`

        result = await request(query , [values.username] , req)

        return result

    }catch(err){throw err}
}
exports.getUsers= async (req) => {
    try{

        let query = `SELECT username FROM asan_melody.users WHERE is_active = 1;`

        let result = await request(query,[]  , req)

        return result

    }catch(err){throw err}
}

exports.getUsersAllDetail= async (req) => {
    try{

        let query = `SELECT * FROM asan_melody.users;`

        let result = await request(query,[]  , req)

        return result

    }catch(err){throw err}
}
exports.getUserPurchase = async (req,values) => {
    try{
        let query = 'SELECT * FROM asan_melody.purchase WHERE `user` = ?;'

        const result =  await request(query,[values.user],req)

        return result
    }catch(err){throw err}
}
exports.getReseveByUser = async(req,values) => {
    try{
        query = 'SELECT * FROM asan_melody.reserved_class WHERE `user` = ?;'

        return await request(query,[values.user],req)

    }catch(err){throw err}
}
exports.deleteReserve = async(req,values) => {
    try{

        let query = 'DELETE FROM asan_melody.reserved_class WHERE class = ? AND `user` = ?;'

        await request(query,[ values.class , values.user],req)
        
        query = 'SELECT number , isActive FROM asan_melody.classes WHERE class_id = ?'

        let classData = await request(query , [values.class] , req)
        
        if (classData[0].isActive === 0){
            query = 'UPDATE asan_melody.classes SET number = ? ,isActive = 1  WHERE class_id = ? ;'
            await request(query , [classData[0].number + 1 , values.class] , req)
        }else{
            query = 'UPDATE asan_melody.classes SET number = ? WHERE class_id = ? ;'
            await request(query , [classData[0].number + 1 , values.class] , req)
        }

        query = 'SELECT * FROM asan_melody.reserved_class WHERE class = ? AND `user` = ?;'

        const result = await request(query,[ values.class , values.user],req)

        return result[0]
        
    }catch(err){throw err}
}


deleteReserveAfterPurchase = async(req,values) => {
    try{

        let query = 'DELETE FROM asan_melody.reserved_class WHERE class = ? AND `user` = ?;'

        await request(query,[ values.class , values.user],req)
        
    }catch(err){throw err}
}
getPurchase = async (req,values) =>{
    try{
        const query = 'SELECT * FROM asan_melody.purchase WHERE `user`=? AND class = ?;'

        const result =  await request(query,[values.user,values.class],req)

        return result[0]
    }catch(err){throw err}
}
addPurchaseToDb = async (req,values) =>{
    try{
        const timestamp = new Date().getTime();

        const query = 'INSERT INTO asan_melody.purchase (`user`, class, `date`, receipt, admit) VALUES(?, ?, ?, ?, 0);'

        await request(query,[values.user,values.class,timestamp,values.image],req)
    }catch(err){throw err}
}

exports.purchase = async (req,values) => {
    try{
        const files = req.files;

        if(files['receipt']){
            const receiptId = uuidv4()
            
            const receipt = files['receipt']

            const destinationPath = path.join(__dirname, '../..', '/receipts');

            const receipt_ext = receipt.name.split('.').pop()

            const receipt_name = receiptId +'.'+receipt_ext;

            if(receipt_ext==='jpg' || receipt_ext==='jpeg' || receipt_ext==='png'){
                
                receipt.name = receipt_name

                const receipt_path = path.join(destinationPath,receipt_name)

                const newValues = {
                    image : '/receipts/' + receipt_name,
                    ...values
                }

                await fs.promises.writeFile(receipt_path , receipt.data)
                await addPurchaseToDb(req,newValues)
                await deleteReserveAfterPurchase(req,newValues)


                return await getPurchase(req,values)
            }else{
                throw CustomError('file format error' , responseMessage(16))
            }
        }else{
            throw CustomError('file error' , responseMessage(15))
        }

    }catch(err){throw err}
}
