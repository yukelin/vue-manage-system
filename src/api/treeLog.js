import request from '../utils/request';

// 获取treelog列表
export const getAllTreeLog = (query) => {
    return request({
        url: 'get_all_tree_log',
        method: 'get',
        params: query
    });
};

// 删除treelog
export const deleteTreeLog = (query) => {
    return request({
        url: 'del_tree_log',
        method: 'get',
        params: query
    });
};


