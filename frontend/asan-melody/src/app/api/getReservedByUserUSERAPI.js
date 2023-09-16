import axios from 'axios';

import {API_KEY} from '../../../config'

import getClassesByIdAPI from './getClassByIdAPI';
import getOrganById from './getOrganByIdAPI';

const getReservedByUserUSERAPI = async (user) => {
    try{
        let url = `${API_KEY}/purchase/getReserveByUser?user=${user}`;
    
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            headers: { 
              'Authorization': localStorage.getItem('authToken')
            },
        };
        config.url = url
        
        let result = await axios.request(config)
        
        let reserve = result.data.body.data

        let class_info,organ

        for(let i = 0 ; i < reserve.length ; i++){
            class_info = await getClassesByIdAPI(reserve[i].class)
            reserve[i].class_info = class_info 
            organ = await getOrganById(class_info.organ)
            reserve[i].organ_info = organ
        }

        return reserve

    }catch(err){throw err}

}   

export default getReservedByUserUSERAPI;