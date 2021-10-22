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
const updateLesson = (lessonId,lessonName, date,chapterId,videoId) => {
    const body =  {
        lessonName:lessonName,
        date:date,
        chapterId:chapterId,
        videoId:videoId
    }
    return Api.put(`${url}/${lessonId}`,body);
};
const getLessonInClassToday = (classId) => {
    return Api.get(`${url}/classes/${classId}/today-lesson`);
}
const getCurrentLessonInClassToday = (classId) => {
    return Api.get(`${url}/classes/${classId}/current-homework`);
}
// export
const api = { 
    getAllLessonInClass,
    createNewLessonInClass,
    updateLesson,
    getLessonInClassToday,
    getCurrentLessonInClassToday
     }
export default api;