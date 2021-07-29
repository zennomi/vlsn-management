import Api from './Api';

const url = "/users";

const login = (username, password) => {

    const parameters = {
        username: username,
        password: password
    }

    return Api.get(`${url}/login`, { params: parameters});
};

// export
const api = { login }
export default api;