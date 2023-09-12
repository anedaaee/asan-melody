

import axios from 'axios';

import {API_KEY} from '../../../config'


const refactorePostAdminAPI = async (data) => {
    try{

        let url = `${API_KEY}/admin/refactorePosts`;
        let config = {
            method: 'put',
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

export default refactorePostAdminAPI;