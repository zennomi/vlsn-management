import Api from './Api';

const url = "/homeworks";

const createHomeWork = (lessonId, name, misson, link,keyLink) => {
    const body = {
        name:name,
        misson:misson,
        link:link,
        keyLink:keyLink
    }
    return Api.post(`${url}/lessons/${lessonId}`,body);
};
const updateHomeWork = (lessonId, name, misson, link,keyLink) => {
    const body = {
        name:name,
        misson:misson,
        link:link,
        keyLink:keyLink
    }
    return Api.put(`${url}/lessons/${lessonId}`,body);
};
const submitHomework = (classId, [...listId]) => {
    const body = [...listId]
    return Api.post(`${url}/classes/${classId}/current-lesson`,body);
};
const getStudentNotSubmittedHomeWorkInLesson = (classId, lessonId) => {
    return Api.get(`${url}/classes/${classId}/students/unfinished/lessons/${lessonId}`);
};
// export
const api = { 
    createHomeWork,
    updateHomeWork,
    submitHomework,
    getStudentNotSubmittedHomeWorkInLesson
     }
export default api;