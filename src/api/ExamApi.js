import Api from './Api';

const url = "/exams";

const getExamResultInClass = (examId, classId) => {

    const parameters = {
        classId: classId,
        examId: examId
    }

    return Api.get(`${url}/results/`, { params: parameters});
};
const getExamResultStatisticInClass = (examId, classId) => {

    const parameters = {
        classId: classId,
        examId: examId
    }

    return Api.get(`${url}/results-statistic/`, { params: parameters});
};

const createExamResult = ([...listMarks]) => {
    const body = listMarks;
    return Api.post(`${url}/results/`, body);
};
const createExamType = (name) => {

    const body = {
        name:name
    }

    return Api.post(`${url}/types/`, body);
};
const getAllExamType = () => {
    return Api.get(`${url}/types/`);
};
const createExam = (examName,typeId,createdDate) => {

    const body = {
        examName : examName,
        typeId:typeId,
        createdDate: createdDate
    }

    return Api.post(`${url}/`, body);
};
const getAllExamInClass = (classId) => {

    const parameters = {
        classId: classId,
    }

    return Api.get(`${url}/`, { params: parameters});
};
const getAllSubjectExamInMonthAtGrade = (month,grade,subject) => {

    const parameters = {
        month: month,
        subject:subject
    }

    return Api.get(`${url}/results/details/${grade}`, { params: parameters});
};
const getAllStudentMarkInExam = (examId) => {

    return Api.get(`${url}/results/${examId}/students-mark`);
};
const getAllStudentNotTakeSubjectExamInMonthAtGrade = (month,grade,subject) => {

    const parameters = {
        month: month,
        subject:subject
    }

    return Api.get(`${url}/results/unsubmit/students/grade/${grade}`, { params: parameters});
};
// export
const api = { 
    getExamResultInClass,
    getExamResultStatisticInClass,
    getAllExamType, 
    createExamType, 
    createExam, 
    createExamResult,
    getAllExamInClass, getAllSubjectExamInMonthAtGrade, getAllStudentMarkInExam,
    getAllStudentNotTakeSubjectExamInMonthAtGrade }
export default api;