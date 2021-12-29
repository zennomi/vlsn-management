import Api from './Api';
import FormData from 'form-data';

const url = "/files";

const uploadUserAvatarImage = (imageFile, userId) => {

    const body = new FormData();
    body.append('image', imageFile);

    return Api.post(`${url}/image/users/${userId}/avatar`, body);
};

// export
const api = { uploadUserAvatarImage }
export default api;