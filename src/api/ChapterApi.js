import Api from './Api';

const url = "/chapters";

const createChapter = (chapterName,grade,subject) => {
    const body ={
        chapterName:chapterName,
        grade:grade,
        subject:subject
    }

    return Api.post(`${url}/`,body);
};
const getAllSubjectChapterInGrade = (grade,subject) => {
    const parameters = {
        subject: subject
    }
    return Api.get(`${url}/grade/${grade}`,{ params: parameters});
};

// export
const api = { 
    createChapter,
    getAllSubjectChapterInGrade
     }
export default api;