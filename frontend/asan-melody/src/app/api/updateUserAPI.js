import axios from 'axios';

import {API_KEY} from '../../../config'


const updateUserAPI = async (data) => {
    try{
        
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${API_KEY}/user/updateUserInfo`,
            headers: { 
              'Authorization': localStorage.getItem('authToken')
            },
            data:data
        };
        
        let result = await axios.request(config)
        
        return result.data.body.data

    }catch(err){throw err}

}   

export default updateUserAPI;