import axios from 'axios';

import {API_KEY} from '../../../config'


const deleteSessionAPI = async (data) => {
    try{

        let url = `${API_KEY}/teacher/deleteSession`;
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
        

    }catch(err){throw err}

}   

export default deleteSessionAPI;