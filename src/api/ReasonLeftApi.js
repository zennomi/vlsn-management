import Api from './Api';

const url = "/reasonlefts";

const createReasonLeft = (studentId, [...listReason]) => {

    const body = [...listReason];
   
    return Api.post(`${url}/deactived/students/${studentId}`, body);
};

// export
const api = { 
    createReasonLeft,

     }
export default api;