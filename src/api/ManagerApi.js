import Api from './Api';

const url = "/managers";

const resetCostInSubjectInGrade = (subject, grade) => {
    const body = {
        subjectName: subject
    }
    return Api.put(`${url}/cost-info/${grade}`,body)
}

const resetMonth = () => {
    return Api.delete(`${url}/attendances/homeworks`)
}
// export
const api = { resetCostInSubjectInGrade,resetMonth }
export default api;