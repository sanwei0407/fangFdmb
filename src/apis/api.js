import axios from 'axios'

const $api = axios.create({
    baseURL:'http://127.0.0.1:7001/api/v1'
})



export  default  $api;
