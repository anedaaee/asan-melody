import axios from 'axios';
import FormData from 'form-data';

import {API_KEY} from '../../../config'

const addOrganAPI = async (data) => {
    try{
        
        let dataAPI = new FormData();
        dataAPI.append('background_image',data.profile);
        dataAPI.append('profile_image', data.background);

        let url = `${API_KEY}/organ/addOrgan?name=${data.name}&manager=${data.manager}&address=${data.address}&phone=${data.phone}&type=${data.type}&description=${data.desctiption}`;
    
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
              'Authorization': localStorage.getItem('authToken')
            },
            data:dataAPI
        };
        config.url = url
        
        let result = await axios.request(config)
        
        return result.data.body.data

    }catch(err){throw err}

}   

export default addOrganAPI;