import Api from './Api';

const url = "/clients";

const getStudentStudyInfo = (studentId) => {

    return Api.get(`${url}/${studentId}`);
};
const getStudentClasses = (studentId) => {

    return Api.get(`${url}/${studentId}/classes`);
};
const getStudentClassesLessonInChapter = (classId,chapterId) => {

    return Api.get(`${url}/classes/${classId}/lessons/chapters/${chapterId}`);
};
const getAllChapterInStudentGrade = (grade,subject) => {
    const parameters = {
        subject:subject,
    }
    return Api.get(`${url}/grade/${grade}/chapters`,{params:parameters});
};
const getAllHomeWorkOfStudent = (studentId) => {
    return Api.get(`${url}/${studentId}/homeworks/`);
};
const getAllStudentDailyStatus = (studentId) => {
    return Api.get(`${url}/${studentId}/daily/status/`);
};
const getTopTenStudentComment = (studentId) => {
    return Api.get(`${url}/comments/students/${studentId}`);
};
// export
const api = { 
    getStudentStudyInfo,
    getStudentClasses,
    getAllChapterInStudentGrade,
    getStudentClassesLessonInChapter,
    getAllHomeWorkOfStudent,
    getAllStudentDailyStatus,
    getTopTenStudentComment
     }
export default api;