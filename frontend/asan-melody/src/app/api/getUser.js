import axios from 'axios';

import {API_KEY} from '../../../config'

const getUserAPI = (cb) => {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${API_KEY}/user/getUserInfo`,
        headers: { 
          'Authorization': localStorage.getItem('authToken')
        }
      };
      

    axios.request(config)
    .then((response) => {
        cb(response,null)
    })
    .catch((error) => {
        cb(null,error)
    });
}   

export default getUserAPI;