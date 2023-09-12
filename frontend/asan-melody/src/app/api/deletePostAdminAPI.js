import axios from 'axios';

import {API_KEY} from '../../../config'


const deletePostAdminAPI = async (data) => {
    try{

        let url = `${API_KEY}/admin/deletePosts`;
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

export default deletePostAdminAPI;