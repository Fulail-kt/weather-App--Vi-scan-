import axios from 'axios'


const Api = axios.create({
    baseURL:'http://localhost:3000/api'
})

// Api.interceptors.request.use((req)=>{
//     if(localStorage.getItem('vi_token')){
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('vi_token')).token}`
//     }
//     return req
// })

Api.interceptors.request.use(
    config => {
      const token = localStorage.getItem('vi_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
export default Api