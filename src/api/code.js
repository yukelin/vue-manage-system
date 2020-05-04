import request from '../utils/request';

// 获取code列表
export const getAllCode = (query) => {
    return request({
        url: 'get_all_code',
        method: 'get',
        params: query
    });
};

// 删除code
export const deleteCode = (query) => {
    return request({
        url: 'del_code',
        method: 'get',
        params: query
    });
};

// 编辑code
export const editCode = (query) => {
    return request({
        url: 'edit_code',
        method: 'post',
        data: query
    });
};

// 新建code
export const addCode = (query) => {
    return request({
        url: 'create_code',
        method: 'post',
        data: query
    });
};


