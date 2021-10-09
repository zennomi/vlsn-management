import Api from './Api';
 
const url = "/attendances";


const getListStudentAttendanceToday = (classId) => {
   
    return Api.get(`${url}/classes/${classId}`);
}
const getListStudentAttendanceInClass = (classId) => {
   
    return Api.get(`${url}/classes/${classId}/main`);
}
const getListStudentNotInClassToday = (classId) => {
    return Api.get(`${url}/classes/${classId}/absent`);
}
const getListAbsentStudentInWeeklyDay = (grade,subject,date) => {
    const parameters = {
        subject: subject
    }
    const body = {
        dateId: date
    }
    return Api.post(`${url}/students/grade/${grade}/absent`,body,{params:parameters});
}
const getListSubStudentInClassToday = (classId) => {
    return Api.get(`${url}/classes/${classId}/sub`);
}
// api này để thêm vào danh sách điểm danh bù của lớp có id là {classId} ngày hôm nay
const addToSubAttendanceClass = (classId,studentId) => {
    
    return Api.post(`${url}/classes/${classId}/sub/${studentId}`);
}
const studentAttenCompensate = (studentId,classId) => { 
    return Api.post(`${url}/classes/${classId}/students/${studentId}`);
}


const getStudentById = (id) => {
    return Api.get(`${url}/students/${id}`);
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
    return Api.post(`${url}/students/${studentId}`,body,{params:parameters });
}
const studentListAtten = ([...listAtten]) => {
    const body = [...listAtten];
    return Api.post(`${url}/students/`,body);
}
// export
const api = {
     getListStudentAttendanceToday,
     addToSubAttendanceClass, 
     getListStudentNotInClassToday, 
     studentAttenCompensate, 
     getStudentById, 
     studentAtten, 
     getListSubStudentInClassToday,
     studentListAtten,
     getListAbsentStudentInWeeklyDay,
     getListStudentAttendanceInClass }
export default api;