import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-77c13.firebaseio.com/'
});

export default instance;