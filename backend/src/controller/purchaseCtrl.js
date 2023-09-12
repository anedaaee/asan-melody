const request = require('../db/request')
const responseMessage = require('../functions/readMessage')
const CustomError = require('../functions/customErr')
const { v4:uuidv4} =  require('uuid')
const path = require('path');
const fs = require('fs');

exports.reserve = async(req,values) => {
    try{
        const timestamp = new Date().getTime();

        let query = 'INSERT INTO asan_melody.reserved_class (`user`, class, `Date`) VALUES(?, ?, ?);'

        await request(query,[values.user, values.class , timestamp],req)
        
        await deleteClassAfterPurchase(req,values)

        query = 'SELECT * FROM asan_melody.reserved_class WHERE class = ? AND `user` = ?;'

        const result = await request(query,[ values.class , values.user],req)

        return result[0]
        
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

exports.getReseveByUser = async(req,values) => {
    try{
        query = 'SELECT * FROM asan_melody.reserved_class WHERE `user` = ?;'

        return await request(query,[values.user],req)

    }catch(err){throw err}
}
exports.getReseveByOrgan = async(req,values) => {
    try{
        query = 'SELECT * FROM asan_melody.reserved_class WHERE class IN (SELECT class_Id AS class FROM asan_melody.classes WHERE organ = ?);'

        return await request(query,[values.organ],req)

    }catch(err){throw err}
}
exports.getAllReserve = async(req) => {
    try{
        query = 'SELECT * FROM asan_melody.reserved_class'

        return await request(query,[],req)

    }catch(err){throw err}
}
deleteClassAfterPurchase  = async(req,values) => {
    try{

        let query = `SELECT number FROM asan_melody.classes WHERE class_id=?; `

        let result = await request(query,[values.class],req)

        let number = result[0].number

        if(number - 1=== 0){
            
            query = 'UPDATE asan_melody.classes SET isActive=0 , number = 0  WHERE class_id=?;'
    
            await request(query,[ values.class],req)
        
        }else if (number > 0){

            query = 'UPDATE asan_melody.classes SET number=? WHERE class_id=?;'

            await request(query,[ number -1 , values.class],req)
        }

        
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

                await addPurchaseToDb(req,newValues)
                await deleteReserveAfterPurchase(req,newValues)
                //await deleteClassAfterPurchase(req,newValues)

                await fs.promises.writeFile(receipt_path , receipt.data)

                return await getPurchase(req,values)
            }else{
                throw CustomError('file format error' , responseMessage(16))
            }
        }else{
            throw CustomError('file error' , responseMessage(15))
        }

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

exports.getNonAdmitPurchases = async (req) => {
    try{
        let query = 'SELECT * FROM asan_melody.purchase;'

        const result =  await request(query,[],req)

        return result
    }catch(err){throw err}
}

exports.getUserClass = async (req,values) => {
    try{
        let query = 'SELECT * FROM asan_melody.classes WHERE class_id IN (SELECT class FROM asan_melody.purchase WHERE `user` = ?);'

        const result =  await request(query,[values.user],req)

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
