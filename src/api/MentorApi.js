import Api from './Api';

const url = "/mentors";

const getAllMentor = () => {
    return Api.get(`${url}/`);
};

// export
const api = { getAllMentor }
export default api;