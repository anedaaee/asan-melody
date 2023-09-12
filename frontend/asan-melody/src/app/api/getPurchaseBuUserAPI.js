import axios from 'axios';

import {API_KEY} from '../../../config'

import getClassesByIdAPI from './getClassByIdAPI';
import getOrganById from './getOrganByIdAPI';

const getPurchaseByUserAPI = async (user) => {
    try{
        let url = `${API_KEY}/purchase/getUserPurchase?user=${user}`;
    
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            headers: { 
              'Authorization': localStorage.getItem('authToken')
            },
        };
        config.url = url
        
        let result = await axios.request(config)

        let purchases = result.data.body.data

        let class_info,organ

        for(let i = 0 ; i < purchases.length ; i++){
            class_info = await getClassesByIdAPI(purchases[i].class)
            purchases[i].class_info = class_info 
            organ = await getOrganById(class_info.organ)
            purchases[i].organ_info = organ
        }

        return purchases

    }catch(err){throw err}

}   

export default getPurchaseByUserAPI;