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
const getStudentById = (id) => {
    return Api.get(`${url}/${id}`);
}
const updateStudentClass = (id,[...listClass]) => {
    const body = [...listClass];
    return Api.put(`${url}/${id}/classes`,body);
}
// export
const api = { getAllStudent,updateStudentInfo , updateStudentClass , getStudentById }
export default api;