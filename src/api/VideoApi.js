import Api from './Api';

const url = "/videos";

const createVideo = (videoName, grade, subject, link) => {
    const body = {
        videoName:videoName,
        grade:grade,
        subject:subject,
        link:link
    }
    return Api.post(`${url}/`,body);
};
const updateVideo = (videoId,videoName, grade, subject, link) => {
    const body = {
        videoName:videoName,
        grade:grade,
        subject:subject,
        link:link
    }
    return Api.put(`${url}/${videoId}`,body);
};

// export
const api = { 
    createVideo,
    updateVideo
     }
export default api;