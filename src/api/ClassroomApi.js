import Api from './Api';
 
const url = "/classes";

const getListClassroomInGrade =  (grade)  => {   
    return Api.get(`${url}/${grade}`);
};

// export
const api = { getListClassroomInGrade }
export default api;