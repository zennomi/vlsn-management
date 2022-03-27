const isRememberMe = () => {
    if (localStorage.getItem("isRememberMe") === null && localStorage.getItem("isRememberMe") === undefined) {
        return true;
    }
     // convert string to boolean and return result
    return JSON.parse(localStorage.getItem("isRememberMe"));
}

const setRememberMe = (isRememberMe) => {
    localStorage.setItem("isRememberMe", isRememberMe);
}

const setItem = (key, value) => {
    if (isRememberMe()) {
        localStorage.setItem(key, value);
    } else {
        sessionStorage.setItem(key, value);
    }
}

const getItem = (key) => {
    if (isRememberMe()) {
    return localStorage.getItem(key);
    }
    return sessionStorage.getItem(key);
}


const removeItem = (key) => {
    if (isRememberMe()) {
        localStorage.removeItem(key);
    } else {
        sessionStorage.removeItem(key);
    }
}
const setToken = (token) => {
    setItem("token", token);
};

const getToken = () => {
    return getItem("token");
}

const removeToken = () => {
    removeItem("token");
};

const isAuth = () => {
    return getToken() !== null && getToken() !== undefined;
}

const setUserInfo = (user) => {
    setItem("id", user.id);
    setItem("firstName", user.firstName);
    setItem("lastName", user.lastName);
    setItem("userName", user.userName);
    setItem("role", user.role);
    setItem("status", user.status);
    setItem("avatarUrl",user.avatarUrl);
    setItem("facebookUrl", user.facebookUrl);
}

const getUserInfo = () => {
    return {
        "id": getItem("id"),
        "firstName": getItem("firstName"),
        "lastName": getItem("lastName"),
        "userName": getItem("userName"),
        "role": getItem("role"),
        "status": getItem("status"),
        "avatarUrl":getItem("avatarUrl"),
        "facebookUrl":getItem("facebookUrl")
    };
}

const removeUserInfo = () => {
    removeItem("id");
    removeItem("firstName");
    removeItem("lastName");
    removeItem("userName");
    removeItem("role");
    removeItem("status");
    removeItem("avatarUrl");
    removeItem("facebookUrl");
};


const storage = { isRememberMe, setRememberMe, setToken, getToken, removeToken, isAuth, setUserInfo, getUserInfo, removeUserInfo }
export default storage;