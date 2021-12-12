import Api from './Api';

const url = "/comments";


const commentForStudent = (studentId,userId,comment) => {
    const body = {
        comment:comment
    }
    return Api.post(`${url}/students/${studentId}/users/${userId}`,body);
};

// export
const api = { 
    commentForStudent
     }
export default api;