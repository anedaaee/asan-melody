import axios from 'axios';
import FormData from 'form-data';

import {API_KEY} from '../../../config'

const addClassAPI = async (data) => {
    try{
        
        let dataAPI = new FormData();
        dataAPI.append('class_image',data.image);

        let url = `${API_KEY}/class/addClass?teacher=${data.teacher}&name=${data.name}&description=${data.description}&price=${data.price}&address=${data.address}&organ=${data.organ}&number=${data.number}`;
    
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
        
        return result.data.body.data

    }catch(err){throw err}

}   

export default addClassAPI;