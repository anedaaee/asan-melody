import axios from 'axios';

import {API_KEY} from '../../../config'

import getClassesByIdAPI from './getClassByIdAPI';
import getOrganById from './getOrganByIdAPI';

const getPurchaseAdminAPI = async (user) => {
    try{
        let url = `${API_KEY}/admin/getPurchases`;
    
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

export default getPurchaseAdminAPI;