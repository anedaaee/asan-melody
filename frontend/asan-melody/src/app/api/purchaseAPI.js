import axios from 'axios';

import {API_KEY} from '../../../config'


const purchaseAPI =async (data) => {
    try{

        let dataAPI = new FormData();
        dataAPI.append('receipt',data.receipt);
        console.log(data);
        let url = `${API_KEY}/purchase/purchase?user=${data.user}&class=${data.class}`;
    
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: { 
              'Authorization': localStorage.getItem('authToken')
            },
            data : dataAPI
        };
        config.url = url
        
        let result = await axios.request(config)
        
        return result.data.body.data

    }catch(err){throw err}

}   

export default purchaseAPI;