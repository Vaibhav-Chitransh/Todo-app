import axios from 'axios';

const api = axios.create({
    baseURL: 'https://todo-app-backend-0dir.onrender.com',
});

export default api;
