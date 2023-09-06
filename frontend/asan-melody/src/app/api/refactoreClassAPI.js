

import axios from 'axios';

import {API_KEY} from '../../../config'


const refactoreClassAPI = async (data) => {
    try{

        let url = `${API_KEY}/class/refactorClass`;
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
              'Authorization': localStorage.getItem('authToken')
            },
            data:data
        };
        config.url = url
        
        let result = await axios.request(config)
        
        return result.data.body.data

    }catch(err){throw err}

}   

export default refactoreClassAPI;