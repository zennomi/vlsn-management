import Api from './Api';

const url = "/lessons";

const getAllLessonInClass = (classId) => {

    return Api.get(`${url}/classes/${classId}`);
};
const createNewLessonInClass = (classId, lessonName, date, chapterId) => {
    const body =  {
        lessonName:lessonName,
        date:date,
        chapterId:chapterId
    }
    return Api.post(`${url}/classes/${classId}`,body);
};
const addExistsLessonsToClass = (classId, [...listLessonId]) => {
    const body =  [...listLessonId];
    return Api.post(`${url}/exist/classes/${classId}`,body);
};
const getAllLessonSubjectAtGrade = (subject, grade, page, pageSize) => {
    const parameters = {
        subject: subject,
        page: page,
        pageSize:pageSize
    }
    return Api.get(`${url}/grade/${grade}/`, { params: parameters});
}
const updateLesson = (lessonId,lessonName, date,chapterId,videoId) => {
    const body =  {
        lessonName:lessonName,
        date:date,
        chapterId:chapterId,
        videoId:videoId
    }
    return Api.put(`${url}/${lessonId}`,body);
};
const deleteLesson = (lessonId) => {
    return Api.delete(`${url}/${lessonId}`);
}
const getLessonInClassToday = (classId) => {
    return Api.get(`${url}/classes/${classId}/today-lesson`);
}
const getCurrentLessonInClassToday = (classId) => {
    return Api.get(`${url}/classes/${classId}/current-lesson`);
}
// export
const api = { 
    getAllLessonInClass,
    createNewLessonInClass,
    addExistsLessonsToClass,
    updateLesson,
    deleteLesson,
    getLessonInClassToday,
    getAllLessonSubjectAtGrade,
    getCurrentLessonInClassToday
     }
export default api;