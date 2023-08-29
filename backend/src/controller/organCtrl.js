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

addOrganToDb = async (req , values)=> {
    try{
        const query = 'INSERT INTO asan_melody.organizations ( name, manager, address, phone, `type`, profile_image, backgroun_image, description) VALUES( ?, ?, ?, ?, ?, ?, ?, ?);'

        const result = await request(query,[values.name,values.manager,values.address,values.phone,values.type,values.profile_image,values.background_image,values.description],req)

        return result[0];

    }catch(err){throw err}
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
            
            const profile_image_name = values.name +'_profile_image.' + profile_image_ext

            const background_image_name = values.name +'_background_image.' + background_image_ext
            
            if((profile_image_ext==='jpg' || profile_image_ext==='jpeg' || profile_image_ext==='png')&&(background_image_ext==='jpg' || background_image_ext==='jpeg' || background_image_ext==='png')){
                profile_image.name = profile_image_name

                background_image.name = background_image_name

                const profile_image_filePath = path.join(destinationPath, profile_image_name); 
                
                const background_image_filePath = path.join(destinationPath, background_image_name); 
                
                const newValues = {
                    ...values,
                    profile_image : profile_image_filePath , 
                    background_image : background_image_filePath
                }

                await addOrganToDb(req,newValues)

                await fs.promises.writeFile(profile_image_filePath, profile_image.data);

                await fs.promises.writeFile(background_image_filePath, background_image.data);

                    
            }else {
                throw CustomError('file format error' , responseMessage(16))
            }

        }else{
            throw CustomError('file error' , responseMessage(15))
        }
    }catch(err){throw err}
}