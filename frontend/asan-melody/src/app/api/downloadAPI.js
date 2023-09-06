import axios from 'axios';

import {API_KEY} from '../../../config'


const downloadAPI = async (link) => {
    try{
        
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_KEY}/download/getFile?link=${link}`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('authToken')
            }
        };
        
        let result = await axios.request(config)
        
        return result

    }catch(err){throw err}

}   

export default downloadAPI;