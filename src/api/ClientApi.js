import Api from './Api';

const url = "/clients";

const getStudentStudyInfo = (studentId) => {

    return Api.get(`${url}/${studentId}`);
};


// export
const api = { 
    getStudentStudyInfo,
     }
export default api;