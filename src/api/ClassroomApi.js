import Api from './Api';
 
const url = "/classes";

const getListClassroomInGrade =  (grade)  => {   
    return Api.get(`${url}/grade/${grade}`);
};
const getListSubjectClassroomInGrade =  (grade,subject)  => {  
    const prametter = {
        subject: subject
    } 
    return Api.get(`${url}/grade/${grade}/subjects/`,{params:prametter});
};
const getListClassroomToday =  (dayInWeek)  => {   
    return Api.get(`${url}/schedule/${dayInWeek}`);
};
const getListClassroomByScheduleAndGrade=  (dayInWeek,grade)  => {   
    return Api.get(`${url}/grade/${grade}/schedule/${dayInWeek}`);
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
const getClassById = (classId) => {
    return Api.get(`${url}/${classId}`);
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
const deleteClass = (classId) => {
    return Api.delete(`${url}/${classId}`)
}
const updateClass = (classId,className, subject,  grade, start, end, schedule,teacherId) => {
    
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
    return Api.put(`${url}/${classId}`,body);
}
const changeCostStatusStudent = (classId, studentId, status) => {
    const body = {
        classId:classId,
        studentId:studentId,
        status:status
    }
    return Api.put(`${url}/students/${studentId}/cost-info`,body);
}

const createMentorClass = (classId,[...listMentor]) => {
    const body = [...listMentor];
    return Api.post(`${url}/${classId}/mentors`,body);
}
const updateMentorClass = (classId,[...listMentor]) => {
    const body = [...listMentor];
    return Api.put(`${url}/${classId}/mentors`,body);
}
const getListStudentCostInfoByStatusInGradeAndSubject = (grade, subject, status) => {
    const parameters = {
        subject:subject,
        status: status
    }
    return Api.get(`${url}/grade/${grade}/students`, {params:parameters});
}
const getAllStudentInClass = (classId) => {
    return Api.get(`${url}/${classId}/students/`);
}
const getAllStudentInClassOnDate = (classId, date) => {
    const parameters = {
        date:date,
    }
    return Api.get(`${url}/attended/classes/${classId}/`, {params:parameters});
}

// export
const api = { getListClassroomInGrade,
    getListClassroomWithSameTypeNow,
     getAllClassList, 
     createClass,
      createMentorClass, 
      getListClassroomToday, 
      getAllStudentInClass,
      getListStudentCostInfoByStatusInGradeAndSubject,
      changeCostStatusStudent,
      getListClassroomByScheduleAndGrade,
      getAllStudentInClassOnDate,
      getListSubjectClassroomInGrade,
      updateMentorClass,
      updateClass,
      deleteClass,
      getClassById
    }
export default api;