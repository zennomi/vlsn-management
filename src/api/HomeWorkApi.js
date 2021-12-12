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
const deleteSubmitHomeWork = (classId, [...listId], lessonId) => {
    const body = [...listId]
    return Api.delete(`${url}/classes/${classId}/lessons/${lessonId}`,{ data: body});
};
const getStudentNotSubmittedHomeWorkInLesson = (classId, lessonId) => {
    return Api.get(`${url}/classes/${classId}/students/unfinished/lessons/${lessonId}`);
};
const getStudentSubmittedHomeWorkInLesson = (classId, lessonId) => {
    return Api.get(`${url}/classes/${classId}/students/finished/lessons/${lessonId}`);
};
const getAllSubmitStudentOfSubjectInGrade = (grade, subject, month) => {
    const parameters = {
        subject:subject,
    }
    return Api.get(`${url}/students/grade/${grade}/months/${month}`, {params:parameters});
};
// export
const api = { 
    createHomeWork,
    updateHomeWork,
    submitHomework,
    deleteSubmitHomeWork,
    getStudentNotSubmittedHomeWorkInLesson,
    getStudentSubmittedHomeWorkInLesson,
    getAllSubmitStudentOfSubjectInGrade
     }
export default api;