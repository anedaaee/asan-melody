import axios from 'axios';

import {API_KEY} from '../../../config'


const followdAPI =async (data) => {
    try{

        let url = `${API_KEY}/organ/followOrgan`;
    
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
              'Authorization': localStorage.getItem('authToken')
            },
            data: data
        };
        config.url = url
        
        let result = await axios.request(config)
        
        

    }catch(err){throw err}

}   

export default followdAPI;