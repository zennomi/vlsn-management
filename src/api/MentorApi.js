import Api from './Api';

const url = "/mentors";

const getAllMentor = () => {
    return Api.get(`${url}/`);
};
const getMentorById = (mentorId) => {
    return Api.get(`${url}/${mentorId}`);
};

const createMentor = (school,username,password,firstName,lastName) => {

    const body = {
        userName: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        school: school,
        role:"MENTOR",
        status:"active"
    }

    return Api.post(`${url}/`, body);
};

const deleteMentor = (mentorId) => {
    return Api.delete(`${url}/${mentorId}`);
}

const updateMentor = (mentorId,school,firstName,lastName) => {

    const body = {
        firstName: firstName,
        lastName: lastName,
        school: school,
        
    }

    return Api.put(`${url}/${mentorId}`, body);
};
// export
const api = { getAllMentor,createMentor,updateMentor,getMentorById,deleteMentor }
export default api;