import axios from 'axios';

import {API_KEY} from '../../../config'

const loginAPI = (values , cb) => {
    let data = JSON.stringify({
        username: values.username,
        password: values.password
    });
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${API_KEY}/auth/signin`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };
    
    axios.request(config)
    .then((response) => {
        cb(response,null)
    })
    .catch((error) => {
        cb(null,error)
    });
}   

export default loginAPI;