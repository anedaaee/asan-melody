import axios from 'axios';

import {API_KEY} from '../../../config'

const signupAPI = (values , cb) => {

    let data = JSON.stringify({
        username: values.username,
        password: values.password,
        firstName : values.firstName,
        lastName : values.lastName,
        phone : values.phone,
        email : values.email
    });
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${API_KEY}/auth/signup`,
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

export default signupAPI;