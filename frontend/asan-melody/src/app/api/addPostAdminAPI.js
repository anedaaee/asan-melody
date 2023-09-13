import axios from 'axios';
import FormData from 'form-data';

import {API_KEY} from '../../../config'

const addPostAdminAPI = async (data) => {
    try{
        
        let dataAPI = new FormData();
        dataAPI.append('post',data.file);

        let url = `${API_KEY}/admin/addPosts?organ=${data.organ}&description=${data.description}&title=${data.title}`;
    
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
              'Authorization': localStorage.getItem('authToken')
            },
            data:dataAPI
        };
        config.url = url
        
        let result = await axios.request(config)
        

    }catch(err){throw err}

}   

export default addPostAdminAPI;