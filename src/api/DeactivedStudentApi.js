import Api from './Api';

const url = "/deactived/students";

const createDeactivedStudent = (firstName, lastName,  school, grade, studentNumber, parentNumber,parentName,leftDate) => {
    const body =  {
        firstName:firstName,
        lastName:lastName,
        school:school,
        grade:grade,
        studentNumber:studentNumber,
        parentNumber:parentNumber,
        parentName: (parentName !== "Chưa có tên PH") ? parentName : "",
        processStatus: '0',
        leftDate: leftDate
    }
    return Api.post(`${url}/`,body);
};
const getAllDeactivedStudentInGrade = (grade) => {
    const parameters = {
        grade: grade,
    }
    return Api.get(`${url}/`, { params: parameters});
};
const deleteDeactivedStudent = (id) => {
    return Api.delete(`${url}/${id}`);
}
// export
const api = { 
    createDeactivedStudent,
    getAllDeactivedStudentInGrade,
    deleteDeactivedStudent
     }
export default api;