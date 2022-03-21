import Api from './Api';

const url = "/reasonlefts";

const createClassSchedule = (studentId, [...listReason]) => {

    const body = [...listReason];
   
    return Api.post(`${url}/deactived/students/${studentId}`, body);
};

// export
const api = { 
    createClassSchedule,

     }
export default api;