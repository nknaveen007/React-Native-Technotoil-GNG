import axios from 'axios';

const instance= axios.create({
    baseURL:'https://app.glamngears.com/admin/api/',
    headers:{
        Authorization:'@CEAUTH09#',
    
    }
})

export default instance
