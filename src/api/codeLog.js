import request from '../utils/request';

// 获取codelog列表
export const getAllCodeLog = (query) => {
    return request({
        url: 'get_all_code_log',
        method: 'get',
        params: query
    });
};

// 删除codelog
export const deleteCodeLog = (query) => {
    return request({
        url: 'del_code_log',
        method: 'get',
        params: query
    });
};


