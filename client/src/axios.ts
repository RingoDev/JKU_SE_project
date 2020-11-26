import axios from 'axios';

let baseURL = 'https://backend.ringodev.com:3000'

if (process.env.NODE_ENV === 'development') baseURL = 'http://localhost:3001'

export default axios.create({baseURL})