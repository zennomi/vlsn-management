import Api from './Api';

const url = "/students";

const getAllStudent = () => {

    return Api.get(`${url}/`);
};
const getAllStudentInGrade = (grade) => {

    return Api.get(`${url}/grade/${grade}`);
};
const updateStudentInfo = (id, firstName, lastName, status, school, grade, studentNumber, parentNumber,parentName,social) => {
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
        social:social
    }
    return Api.put(`${url}/${id}`,body);
}
const updateStudentStatus = (id,status) => {
    const body =  {
        status:status,
    }
    return Api.put(`${url}/${id}/status/`,body);
}
const createStudent = (username, password, firstName, lastName,  school, grade, studentNumber, parentNumber,parentName,social) => {
    
    const body =  {
        userName: username,
        password: password,
        role:"STUDENT",
        status:"active",
        firstName:firstName,
        lastName:lastName,
        school:school,
        grade:grade,
        studentNumber:studentNumber,
        parentNumber:parentNumber,

        social:(social !== '') ? social : null,
        parentName: (parentName !== "Chưa có tên PH") ? parentName : "",
    }
    return Api.post(`${url}/`,body);
}
const getStudentStatisticInMonthAtGrade = (month, grade) => {
    const parameters = {
        month: month,
        grade:grade
    }
    
    return Api.get(`${url}/statistic`,{params:parameters });
}
const deleteStudent = (studentId) => {
    return Api.delete(`${url}/${studentId}`)
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
// lấy ra lớp học của học sinh tại thời điểm hiện tại
const getClassInPresentStudent = (studentId, weekyDay) => { 
    const parameters = {
        schedule: weekyDay
    }
    return Api.get(`${url}/${studentId}/classes/schedule/now`, {params:parameters });
}
const getStudentClasses = (studentId) => { 
    return Api.get(`${url}/${studentId}/classes`);
}
const studentAtten = (studentId,status,classId,dateId) => { 
    const parameters = {
        status: status
    }
    const body =  {
        dateId:dateId,
        studentId:studentId,
        classroomId:classId
    }
    return Api.post(`${url}/${studentId}/attdendances/`,body,{params:parameters });
}
const getStatictisSubjectAvgMarkInGrade = (grade,subjectName) => { 
    const parameters = {
        subjectName:subjectName
    }
    
    return Api.get(`${url}/avg-mark/statistic/${grade}`,{params:parameters });
}
const getStudentSubjectAvgMarkInGrade = (grade,subjectName) => { 
    const parameters = {
        subjectName:subjectName
    }
    
    return Api.get(`${url}/avg-mark/${grade}`,{params:parameters });
}
const getWeakStudentSubjectAvgMarkInGrade = (grade,subjectName) => { 
    const parameters = {
        subjectName:subjectName
    }
    
    return Api.get(`${url}/avg-mark/weak/${grade}`,{params:parameters });
}
const getStudentByStatus = (status) => {
    return Api.get(`${url}/status/${status}`);
}

// export
const api = { 
    getAllStudent,
    updateStudentInfo, 
    updateStudentClass, 
    updateStudentStatus,
    getStudentById, 
    createStudent,
    deleteStudent,
    createStudentClass, 
    getStudentByPhoneNumber, 
    getClassInPresentStudent, 
    getStudentClasses, 
    studentAtten, 
    getStudentByStatus,
    getStatictisSubjectAvgMarkInGrade,
    getStudentSubjectAvgMarkInGrade,
    getAllStudentInGrade,
    getStudentStatisticInMonthAtGrade,
    getWeakStudentSubjectAvgMarkInGrade }
export default api;