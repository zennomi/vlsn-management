import axios from 'axios';
import storage from '../Storage/storage';

const axiosClient = axios.create({
    baseURL: `http://tctmanagementsystem-env.eba-uh33vr3k.ap-southeast-1.elasticbeanstalk.com/api/v1`,
    //timeout: 5000, // default is `0` (no timeout)
    // responseType: 'json'
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    //check token
    const token = storage.getToken();
    if (token != null && token !== undefined) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        
    }
    return config;
});

axiosClient.interceptors.response.use((response) => {
   
    if (response && response.data !== undefined) {
        // only get data
        return response.data;
    }

    return response;
}, async (error) => {
    // handle token expried
    // auto redirect to sign in page

    // Handle errors
    if (error.response.data === "expried token") {
        await localStorage.clear();
        window.location.href = "/auth/sign-in";
        await alert("Phiên làm việc của bạn đã hết hạn! vui lòng đăng nhập lại")
        throw error.response.data;
    } else if(error.request){
        throw error.request
    }else{
        throw error;
    }
});

export default axiosClient;

