

import axios from 'axios';

import {API_KEY} from '../../../config'


const deleteUserAPI = async (username) => {
    try{
        const data = {
            username:username
        }
        let url = `${API_KEY}/user/deleteUserInfo`;
        let config = {
            method: 'delete',
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

export default deleteUserAPI;