import axios from 'axios';
import { message } from 'antd';

const $axios = axios.create({
    timeout: 6000,
});

//请求拦截
$axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        message.error(error);
        return Promise.reject(error);
    }
);

$axios.interceptors.response.use(
    response => {
        return Promise.resolve(response);
    },
    error => {
        console.log(error.response);
        message.error('请求失败');
        return Promise.reject(error);
    }
);

export default function request(url: string, data = {}, method = 'POST') {
    return new Promise((resolve, reject) => {

        const options = method === 'POST' ? {
            url,
            method,
            data
        } : {
            url,
            method,
            params: data
        };

        $axios(options)
            .then(res => {
                const { data } = { ...res };
                resolve(data.data);
            })
            .catch(error => {
                reject();
            })
    })
}
