import axios from 'axios';

import {API_KEY} from '../../../config'


const getUserPermisionbyPermissionAPI = async (data) => {
    try{
        let url = `${API_KEY}/userManagement/getUserPermisionbyPermission?permission=${data.permission}`;
    
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

export default getUserPermisionbyPermissionAPI;