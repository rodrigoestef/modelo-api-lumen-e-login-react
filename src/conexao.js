import axios from 'axios';


const config = ()=>{

    const token = localStorage.getItem('token')
    if (!token) {
        return axios.create({baseURL:'http://localhost/teste/public'});
    }else{
        return axios.create({baseURL:'http://localhost/teste/public',headers:{'Authorization': `Bearer ${token}`}});
    }
}

export default config