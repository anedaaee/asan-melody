import axios from 'axios';

import {API_KEY} from '../../../config'


const getAcademiesAPI =async () => {
    try{

        let url = `${API_KEY}/public/getAcademies`;
    
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
        };
        config.url = url
        
        let result = await axios.request(config)
        
        return result.data.body.data

    }catch(err){throw err}

}   

export default getAcademiesAPI;