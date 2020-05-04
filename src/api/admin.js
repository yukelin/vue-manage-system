import request from '../utils/request';

// 获取
export const getAdmin = (query) => {
    return request({
        url: 'get_user',
        method: 'get',
        params: query
    });
};


// 获取
export const editAdmin = (query) => {
    return request({
        url: 'update_user',
        method: 'post',
        data: query
    });
};