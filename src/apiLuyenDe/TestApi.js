import Api from './Api';


const url = "/tests";

const getExamResultTable = (examId) => {
    return Api.get(`${url}/${examId}/result-table`);
};

// export
const api = { getExamResultTable }
export default api;