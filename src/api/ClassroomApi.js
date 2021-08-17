import Api from './Api';
 
const url = "/classes";

const getListClassroomInGrade =  (grade)  => {   
    return Api.get(`${url}/grade/${grade}`);
};
const getListClassroomToday =  (dayInWeek)  => {   
    return Api.get(`${url}/schedule/${dayInWeek}`);
};
const getListClassroomWithSameTypeNow =  (dayInWeek,grade,subjectName)  => { 
    const prametter = {
        subjectName: subjectName
    }
    
    return Api.get(`${url}/schedule/${dayInWeek}/grade/${grade}`,{params:prametter});
};
const getAllClassList = () => {
    return Api.get(`${url}/`);
}
const createClass = (className, subject,  grade, start, end, schedule,teacherId) => {
    
    const body =  {
        className: className,
        subject: subject,
        grade: grade,
        startTime: start,
        endTime: end,
        schedule: schedule,
        teacherId: {
            id: teacherId
        }
    }
    return Api.post(`${url}/`,body);
}
const createMentorClass = (classId,[...listMentor]) => {
    const body = [...listMentor];
    return Api.post(`${url}/${classId}/mentors`,body);
}

const getAllStudentInClass = (classId) => {
    return Api.get(`${url}/${classId}/students/`);
}


// export
const api = { getListClassroomInGrade,getListClassroomWithSameTypeNow, getAllClassList, createClass, createMentorClass, getListClassroomToday, getAllStudentInClass }
export default api;