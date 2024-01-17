import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'http://localhost:8000/chipher',
});

export default axiosApi;