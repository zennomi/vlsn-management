import Api from './Api';

const url = "/teachers";

const getListTeacherBySubject = (subjectName) => {

    const parameters = {
        subjectName: subjectName
    }

    return Api.get(`${url}/subject/`, { params: parameters});
};

const getAllTeacher = () => {
    return Api.get(`${url}/`);
};
const getTeacherById = (teacherId) => {
    return Api.get(`${url}/${teacherId}`);
};
const createTeacher = (subjectName,username,password,firstName,lastName) => {

    const body = {
        userName: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        subjectName: subjectName,
        role:"TEACHER"
    }

    return Api.post(`${url}/`, body);
};
const deleteTeacher = (teacherId) => {
    return Api.delete(`${url}/${teacherId}`)
}
const updateTeacher = (teacherId,subjectName,firstName,lastName) => {

    const body = {
        firstName: firstName,
        lastName: lastName,
        subjectName: subjectName,
        
    }

    return Api.put(`${url}/${teacherId}`, body);
};
// export
const api = { getListTeacherBySubject,createTeacher,getAllTeacher,updateTeacher,getTeacherById,deleteTeacher }
export default api;