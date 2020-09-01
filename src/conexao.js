import axios from 'axios';
import { baseUrl } from "../config.json";


const config = ()=>{

    const token = localStorage.getItem('token')
    if (!token) {
        return axios.create({baseURL:baseUrl});
    }else{
        return axios.create({baseURL:baseUrl,headers:{'Authorization': `Bearer ${token}`}});
    }
}

export default config