import axios from 'axios';

import {API_KEY} from '../../../config'


const getClassesByIdAPI = async (classId) => {
    try{
        let url = `${API_KEY}/class/getClassByClassId?classId=${classId}`;
    
        let config = {
            method: 'get',
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

export default getClassesByIdAPI;