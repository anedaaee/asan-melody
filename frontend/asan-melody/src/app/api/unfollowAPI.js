import axios from 'axios';

import {API_KEY} from '../../../config'


const unfollowdAPI =async (data) => {
    try{

        let url = `${API_KEY}/organ/unfollowOrgan`;
    
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

export default unfollowdAPI;