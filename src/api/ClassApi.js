import Api from './Api';
 
const url = "/class";

const getListClassByMentor =  (id)  => {   
    return Api.get(`${url}/mentor/${id}`);
};

// export
const api = { getListClassByMentor }
export default api;