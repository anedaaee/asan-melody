

import axios from 'axios';

import {API_KEY} from '../../../config'


const deleteOrganAPI = async (id) => {
    try{
        let url = `${API_KEY}/organ/deleteOrgan?id=${id}`;
        let config = {
            method: 'delete',
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

export default deleteOrganAPI;