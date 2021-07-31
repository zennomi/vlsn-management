import Api from './Api';
 
const url = "/classes";

const getListClassroomInGrade =  (grade)  => {   
    return Api.get(`${url}/grade/${grade}`);
};
const getAllClassList = () => {
    return Api.get(`${url}/`);
}
// export
const api = { getListClassroomInGrade, getAllClassList }
export default api;