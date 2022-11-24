import axios from 'axios';

const HttpClient = () => {
    var token = null;
    if(localStorage.getItem('token')) token=localStorage.getItem('token');
    const defaultOptions = {
        headers: {
            Authorization: token ? `Bearer ${token}` : null
        }, mode: 'cors'
    };

    return {
        get: (url, options = {}) => axios.get(url, {...defaultOptions, ...options}),
        post: (url, data, options = {}) => axios.post(url, data, {...defaultOptions, ...options})
    };

}

export default HttpClient;