import Api from './Api';

const url = "/teachers";

const getListTeacherBySubject = (subjectName) => {

    const parameters = {
        subjectName: subjectName
    }

    return Api.get(`${url}/subject/`, { params: parameters});
};

// export
const api = { getListTeacherBySubject }
export default api;