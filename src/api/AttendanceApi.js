import Api from './Api';
 
const url = "/attendance/class";

const getListAttendance =  (classId,subjectId,date)  => {   
    return Api.get(`${url}?classId=${classId}&subjectId=${subjectId}&page=0&pageSize=10&serach=&date=${date}`);
};

// export
const api = { getListAttendance }
export default api;