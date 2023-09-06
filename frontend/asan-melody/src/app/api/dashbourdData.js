import axios from 'axios';

import {API_KEY} from '../../../config'


const dashboardAPI =async () => {
    try{
        let data = {}

        let url = `${API_KEY}/dashboard/getNumberOfUsers`;
    
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            headers: { 
              'Authorization': localStorage.getItem('authToken')
            }
        };
        config.url = url
        
        let result = await axios.request(config)
        
        data.numberOfUser = result.data.body.data.number_of_user


        url = `${API_KEY}/dashboard/getNumberOfOrgan`;

        config.url = url
        
        result = await axios.request(config)

        data.numberOfOrgan = result.data.body.data.number_of_organ

        url = `${API_KEY}/dashboard/getNumberOfPurchase`;

        config.url = url
        
        result = await axios.request(config)
        
        data.numberOfClass = result.data.body.data.number_of_class


        url = `${API_KEY}/dashboard/getTotalAmount`;

        config.url = url
        
        result = await axios.request(config)
        
        data.totalAmount = result.data.body.data.total_amount


        return data
    }catch(err){throw err}

}   

export default dashboardAPI;