import axios from 'axios';
import FormData from 'form-data';

import {API_KEY} from '../../../config'


const updateOrganBackgroundAPI = async (file,id) => {
    try{
        let url = `${API_KEY}/organ/updateBackgroundImage?id=${id}`;
    
        let dataAPI = new FormData();
        dataAPI.append('background_image',file);

        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            headers: { 
              'Authorization': localStorage.getItem('authToken')
            },
            data:dataAPI
        };
        config.url = url
        
        let result = await axios.request(config)
        
        return result.data.body.data

    }catch(err){throw err}

}   

export default updateOrganBackgroundAPI;