import Api from './Api';

const url = "/students";

const getAllStudent = () => {

    return Api.get(`${url}/`);
};
const updateStudentInfo = (id, firstName, lastName, status, school, grade, studentNumber, parentNumber,parentName) => {
    const body =  {
        id:id,
        firstName:firstName,
        lastName:lastName,
        status:status,
        school:school,
        grade:grade,
        studentNumber:studentNumber,
        parentNumber:parentNumber,
        parentName: (parentName !== "Chưa có tên PH") ? parentName : "",
    }
    return Api.put(`${url}/${id}`,body);
}
const createStudent = (username, password, firstName, lastName,  school, grade, studentNumber, parentNumber,parentName) => {
    
    const body =  {
        userName: username,
        password: password,
        firstName:firstName,
        lastName:lastName,
        school:school,
        grade:grade,
        studentNumber:studentNumber,
        parentNumber:parentNumber,
        parentName: (parentName !== "Chưa có tên PH") ? parentName : "",
    }
    return Api.post(`${url}/`,body);
}
const getStudentById = (id) => {
    return Api.get(`${url}/${id}`);
}
const getStudentByPhoneNumber = (number) => {
    return Api.get(`${url}/phone/${number}`);
}
const updateStudentClass = (id,[...listClass]) => {
    const body = [...listClass];
    return Api.put(`${url}/${id}/classes`,body);
}
const createStudentClass = (id,[...listClass]) => {
    const body = [...listClass];
    return Api.post(`${url}/${id}/classes`,body);
}
// export
const api = { getAllStudent,updateStudentInfo , updateStudentClass , getStudentById, createStudent,createStudentClass, getStudentByPhoneNumber }
export default api;