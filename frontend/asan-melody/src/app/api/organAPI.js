import axios from 'axios';

import {API_KEY} from '../../../config'


const organAPI =async () => {
    try{
        let data = {}

        let url = `${API_KEY}/organ/getOrgans`;
    
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            headers: { 
              'Authorization': localStorage.getItem('authToken')
            }
        };
        config.url = url
        
        let result = await axios.request(config)
        
        data.organs = result.data.body.data


        return data
    }catch(err){throw err}

}   

export default organAPI;