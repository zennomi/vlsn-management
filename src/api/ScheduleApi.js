import Api from './Api';


const url = "/schedules";

const createClassSchedule = (classId, [...listSchedule]) => {

    const body = [...listSchedule];
   
    return Api.post(`${url}/classes/${classId}`, body);
};

const updateClassSchedule = (classId, [...listSchedule]) => {

    const body = [...listSchedule];
   
    return Api.put(`${url}/classes/${classId}`, body);
};

// export
const api = { createClassSchedule, updateClassSchedule }
export default api;