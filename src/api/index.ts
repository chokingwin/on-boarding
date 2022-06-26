import request from './request';
import mock from './mock';

const http = process.env.REACT_APP_MODE === 'dev' ? mock : request;

const api = {
    login(data: any) {
        return http('/api/user/login', data)
    },
    sbumit(data: any) {
        return http('/api/user/onboarding', data)
    },
    getUserInfo(data: any) {
        return http('/api/user/onboarding', data, 'GET')
    },
    upload(data: any) {
        return http('/api/file-uplad', data)
    }
}

export default api;
