import axios from 'axios';

import {API_KEY} from '../../../config'


const updateOrganAPI = async (data) => {
    try{
        let url = `${API_KEY}/organ/updateOrgan?name=${data.name}&manager=${data.manager}&address=${data.address}&phone=${data.phone}&description=${data.description}&id=${data.id}`;
    
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            headers: { 
              'Authorization': localStorage.getItem('authToken')
            },
        };
        config.url = url
        
        let result = await axios.request(config)
        
        return result.data.body.data

    }catch(err){throw err}

}   

export default updateOrganAPI;