const request = require('../db/request')
const responseMessage = require('../functions/readMessage')
const CustomError = require('../functions/customErr')
const path = require('path');
const fs = require('fs');

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
getOrgan = async (req,id) => {
    try{
        const query = `SELECT * FROM asan_melody.organizations WHERE id = ?`
    
        const result = await request(query , [id] ,req)
    
        return result[0]
    }catch(err){throw err}
}
getId = async(req) => {
    try{
        const query = 'SELECT (MAX(id)+1) as id FROM asan_melody.organizations;'
        
        const result = await request(query,[],req)

        return result[0].id
    }catch(err){throw err}
}
addOrganToDb = async (req , values)=> {
    try{
        let query = 'INSERT INTO asan_melody.organizations ( id , name, manager, address, phone, `type`, profile_image, background_image, description) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);'

        await request(query,[values.id,values.name,values.manager,values.address,values.phone,values.type,values.profile_image,values.background_image,values.description],req)

        query = `INSERT INTO asan_melody.user_management (username,organ,permission) VALUES (?,?,'manager');`

        await request(query,[values.manager,values.id],req)

    }catch(err){
        console.log(err);
        throw err}
}

exports.addOrgan = async (req,values) => { 
    try{
        const files = req.files

        if (files['profile_image'] && files['background_image']){

            let profile_image = files['profile_image'] 

            let background_image = files['background_image']

            const destinationPath = path.join(__dirname, '../..', '/profiles');

            
            const profile_image_split = profile_image.name.split('.')
            
            const background_image_split = background_image.name.split('.')
            
            const profile_image_ext = profile_image_split.pop()
            
            const background_image_ext = background_image_split.pop()
            
            const id = await getId(req)
            
            const profile_image_name = id +'_profile_image.' + profile_image_ext

            const background_image_name = id +'_background_image.' + background_image_ext
            
            if((profile_image_ext==='jpg' || profile_image_ext==='jpeg' || profile_image_ext==='png')&&(background_image_ext==='jpg' || background_image_ext==='jpeg' || background_image_ext==='png')){
                
                profile_image.name = profile_image_name

                background_image.name = background_image_name

                const profile_image_filePath = path.join(destinationPath, profile_image_name); 
                
                const background_image_filePath = path.join(destinationPath, background_image_name); 

                const newValues = {
                    id : id,
                    ...values,
                    profile_image : '/profiles/'+ profile_image_name , 
                    background_image :'/profiles/'+ background_image_name
                }

                await addOrganToDb(req,newValues)

                await fs.promises.writeFile(profile_image_filePath, profile_image.data);

                await fs.promises.writeFile(background_image_filePath, background_image.data);

                return await getOrgan(req,id)
                    
            }else {
                throw CustomError('file format error' , responseMessage(16))
            }

        }else{
            throw CustomError('file error' , responseMessage(15))
        }
    }catch(err){throw err}
}

exports.updateProfile_image = async (req , values) => {
    try{
        const files = req.files

        if (files['profile_image']){

            let oldPath = await request ('SELECT profile_image FROM asan_melody.organizations WHERE id=?',[values.id],req)
            oldPath = oldPath[0].profile_image

            const file = files ['profile_image']

            const profile_image_split = file.name.split('.')
            
            const profile_image_ext = profile_image_split.pop()

            const profile_image_name = values.id +'_profile_image.' + profile_image_ext

            file.name = profile_image_name

            const destinationPath = path.join(__dirname, '../..', '/profiles');

            const profile_image_filePath = path.join(destinationPath, profile_image_name); 
            
            if(profile_image_ext==='jpg' || profile_image_ext==='jpeg' || profile_image_ext==='png'){
            
                const query = `UPDATE asan_melody.organizations SET profile_image=? WHERE id=?;`
    
                await request(query,['/profiles/'+profile_image_name,values.id],req)
    
                await fs.promises.unlink(path.join(__dirname, '../..',oldPath))
    
                await fs.promises.writeFile(profile_image_filePath, file.data);

                return await getOrgan(req,values.id)
            }else {
                throw new CustomError('file format',responseMessage(16))
            }

        }
    }catch(err){
        throw err}
}

exports.updateBackground_image = async (req , values) => {
    try{
        const files = req.files

        if (files['background_image']){
            
            let oldPath = await request ('SELECT background_image FROM asan_melody.organizations WHERE id=?',[values.id],req)
            oldPath = oldPath[0].background_image

            const file = files ['background_image']

            const background_image_split = file.name.split('.')
            
            const background_image_ext = background_image_split.pop()

            const background_image_name = values.id +'_background_image.' + background_image_ext

            file.name = background_image_name

            const destinationPath = path.join(__dirname, '../..', '/profiles');

            const background_image_filePath = path.join(destinationPath, background_image_name); 
            
            if(background_image_ext==='jpg' || background_image_ext==='jpeg' || background_image_ext==='png'){
                
            const query = `UPDATE asan_melody.organizations SET background_image=? WHERE id=?;`
                
            await request(query,['/profiles/'+background_image_name,values.id],req)

            await fs.promises.unlink(path.join(__dirname, '../..',oldPath))
            
            await fs.promises.writeFile(background_image_filePath, file.data);
            
            return await getOrgan(req,values.id)

            }else{
                throw new CustomError('file format',responseMessage(16))
            }
        }
    }catch(err){
        throw err}
}

exports.updateOrgan = async(req,values) =>{
    try{
        const query = `UPDATE asan_melody.organizations
                            SET name=?, manager=?, address=?, phone=?, description=?
                            WHERE id=?;`

        await request(query , [  values.name , values.manager , values.address , values.phone , values.description ,values.id ],req)

        return await getOrgan(req,values.id)

    }catch(err){throw err}
}

exports.deleteOrgan = async(req,values) =>{
    try{
        const query = `UPDATE asan_melody.organizations
                            SET isActive=0
                            WHERE id=?;`

        await request(query , [values.id ],req)

        return await getOrgan(req,values.id)

    }catch(err){throw err}
}
exports.refactorOrgan = async(req,values) =>{
    try{
        const query = `UPDATE asan_melody.organizations
                            SET isActive=1
                            WHERE id=?;`

        await request(query , [values.id ],req)

        return await getOrgan(req,values.id)

    }catch(err){throw err}
}
exports.followOrgan = async(req,values) => {
    try{
        let query = 'INSERT INTO asan_melody.fallowed_organ (`user`, organ_id) VALUES(?, ?);'

        await request(query , [values.username , values.organ] , req)

        query = 'SELECT * FROM asan_melody.fallowed_organ WHERE `user`=? AND organ_id=?;'

        return await request(query , [values.username , values.organ] , req)

    }catch(err){throw err}
}
exports.unfollowOrgan = async(req,values) => {
    try{
        let query = 'DELETE FROM asan_melody.fallowed_organ WHERE `user` = ? AND organ_id = ? ;'

        await request(query , [values.username , values.organ] , req)

    }catch(err){
        throw err}
}
exports.getFollowdOrgan = async(req,values) => {
    try{
        let query = 'SELECT organ_id FROM asan_melody.fallowed_organ WHERE `user`=?;'

        let result = await request(query , [values.username] , req)

        return result

    }catch(err){throw err}
}