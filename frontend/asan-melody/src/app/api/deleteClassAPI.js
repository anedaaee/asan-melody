import axios from 'axios';

import {API_KEY} from '../../../config'


const deleteClassAPI = async (data) => {
    try{

        let url = `${API_KEY}/class/deleteClass`;
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            headers: { 
              'Authorization': localStorage.getItem('authToken')
            },
            data:data
        };
        config.url = url
        
        let result = await axios.request(config)
        
        return result.data.body.data

    }catch(err){throw err}

}   

export default deleteClassAPI;